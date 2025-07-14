from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from src.models import db
from src.models.application import Application
from src.models.job import Job
from src.models.user import User
from src.schemas.application_schema import ApplicationCreateSchema, ApplicationUpdateSchema, ApplicationSchema, ApplicationListSchema

applications_bp = Blueprint('applications', __name__)

@applications_bp.route('', methods=['POST'])
@jwt_required()
def create_application():
    """Candidatar-se a uma vaga"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'candidato':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Apenas candidatos podem se candidatar a vagas'}}), 403
        
        schema = ApplicationCreateSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify({'error': {'code': 'VALIDATION_ERROR', 'message': 'Dados inválidos', 'details': err.messages}}), 400
        
        # Verificar se a vaga existe e está ativa
        job = Job.query.get(data['vaga_id'])
        if not job:
            return jsonify({'error': {'code': 'JOB_NOT_FOUND', 'message': 'Vaga não encontrada'}}), 404
        
        if not job.is_available():
            return jsonify({'error': {'code': 'JOB_NOT_AVAILABLE', 'message': 'Vaga não está disponível para candidaturas'}}), 400
        
        # Verificar se o usuário já se candidatou a esta vaga
        existing_application = Application.query.filter_by(
            usuario_id=current_user['id'],
            vaga_id=data['vaga_id']
        ).first()
        
        if existing_application:
            return jsonify({'error': {'code': 'ALREADY_APPLIED', 'message': 'Você já se candidatou a esta vaga'}}), 409
        
        # Criar candidatura
        application = Application(
            usuario_id=current_user['id'],
            vaga_id=data['vaga_id'],
            carta_apresentacao=data.get('carta_apresentacao')
        )
        
        db.session.add(application)
        db.session.commit()
        
        application_schema = ApplicationSchema()
        return jsonify({
            'message': 'Candidatura enviada com sucesso',
            'candidatura': application_schema.dump(application)
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@applications_bp.route('/my', methods=['GET'])
@jwt_required()
def get_my_applications():
    """Listar candidaturas do usuário logado"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'candidato':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Acesso negado'}}), 403
        
        # Parâmetros de paginação
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 50)
        
        # Query das candidaturas do usuário
        query = Application.query.filter_by(usuario_id=current_user['id']).order_by(Application.data_candidatura.desc())
        
        # Paginação
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        applications = pagination.items
        
        # Serializar dados
        application_schema = ApplicationListSchema(many=True)
        return jsonify({
            'candidaturas': application_schema.dump(applications),
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': pagination.total,
                'pages': pagination.pages,
                'has_next': pagination.has_next,
                'has_prev': pagination.has_prev
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@applications_bp.route('/<int:application_id>', methods=['GET'])
@jwt_required()
def get_application(application_id):
    """Obter detalhes de uma candidatura específica"""
    try:
        current_user = get_jwt_identity()
        
        application = Application.query.get(application_id)
        if not application:
            return jsonify({'error': {'code': 'APPLICATION_NOT_FOUND', 'message': 'Candidatura não encontrada'}}), 404
        
        # Verificar permissão (candidato ou empresa dona da vaga)
        if current_user['type'] == 'candidato':
            if application.usuario_id != current_user['id']:
                return jsonify({'error': {'code': 'FORBIDDEN', 'message': 'Você não tem permissão para ver esta candidatura'}}), 403
        elif current_user['type'] == 'empresa':
            if application.vaga.empresa_id != current_user['id']:
                return jsonify({'error': {'code': 'FORBIDDEN', 'message': 'Você não tem permissão para ver esta candidatura'}}), 403
        else:
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Acesso negado'}}), 403
        
        application_schema = ApplicationSchema()
        return jsonify({'candidatura': application_schema.dump(application)}), 200
        
    except Exception as e:
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@applications_bp.route('/<int:application_id>/status', methods=['PUT'])
@jwt_required()
def update_application_status(application_id):
    """Atualizar status de uma candidatura (apenas empresa)"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'empresa':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Apenas empresas podem atualizar status de candidaturas'}}), 403
        
        application = Application.query.get(application_id)
        if not application:
            return jsonify({'error': {'code': 'APPLICATION_NOT_FOUND', 'message': 'Candidatura não encontrada'}}), 404
        
        # Verificar se a empresa é dona da vaga
        if application.vaga.empresa_id != current_user['id']:
            return jsonify({'error': {'code': 'FORBIDDEN', 'message': 'Você não tem permissão para atualizar esta candidatura'}}), 403
        
        schema = ApplicationUpdateSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify({'error': {'code': 'VALIDATION_ERROR', 'message': 'Dados inválidos', 'details': err.messages}}), 400
        
        # Atualizar status
        if 'status_candidatura' in data:
            application.update_status(data['status_candidatura'])
        
        db.session.commit()
        
        application_schema = ApplicationSchema()
        return jsonify({
            'message': 'Status da candidatura atualizado com sucesso',
            'candidatura': application_schema.dump(application)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@applications_bp.route('/job/<int:job_id>', methods=['GET'])
@jwt_required()
def get_job_applications(job_id):
    """Listar candidatos de uma vaga (apenas empresa dona)"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'empresa':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Apenas empresas podem ver candidatos de suas vagas'}}), 403
        
        job = Job.query.get(job_id)
        if not job:
            return jsonify({'error': {'code': 'JOB_NOT_FOUND', 'message': 'Vaga não encontrada'}}), 404
        
        if job.empresa_id != current_user['id']:
            return jsonify({'error': {'code': 'FORBIDDEN', 'message': 'Você não tem permissão para ver os candidatos desta vaga'}}), 403
        
        # Parâmetros de paginação
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 50)
        
        # Filtro por status
        status = request.args.get('status')
        
        # Query das candidaturas da vaga
        query = Application.query.filter_by(vaga_id=job_id).order_by(Application.data_candidatura.desc())
        
        if status:
            query = query.filter_by(status_candidatura=status)
        
        # Paginação
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        applications = pagination.items
        
        # Serializar dados
        application_schema = ApplicationListSchema(many=True)
        return jsonify({
            'candidaturas': application_schema.dump(applications),
            'vaga': job.to_dict(include_empresa=False),
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': pagination.total,
                'pages': pagination.pages,
                'has_next': pagination.has_next,
                'has_prev': pagination.has_prev
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

