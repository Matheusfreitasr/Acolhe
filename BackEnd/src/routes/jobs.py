from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from sqlalchemy import or_, and_
from src.models import db
from src.models.job import Job
from src.models.company import Company
from src.schemas.job_schema import JobCreateSchema, JobUpdateSchema, JobSchema, JobListSchema

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('', methods=['GET'])
def list_jobs():
    """Listar vagas com filtros e paginação"""
    try:
        # Parâmetros de paginação
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 50)  # Máximo 50 por página
        
        # Parâmetros de filtro
        search = request.args.get('search', '')
        tipo_contrato = request.args.get('tipo_contrato')
        modalidade = request.args.get('modalidade')
        nivel_experiencia = request.args.get('nivel_experiencia')
        cidade = request.args.get('cidade')
        estado = request.args.get('estado')
        area = request.args.get('area')
        
        # Query base
        query = Job.query.filter_by(status='ativa')
        
        # Aplicar filtros
        if search:
            query = query.filter(or_(
                Job.titulo.contains(search),
                Job.descricao.contains(search),
                Job.requisitos.contains(search)
            ))
        
        if tipo_contrato:
            query = query.filter_by(tipo_contrato=tipo_contrato)
        
        if modalidade:
            query = query.filter_by(modalidade=modalidade)
        
        if nivel_experiencia:
            query = query.filter_by(nivel_experiencia=nivel_experiencia)
        
        if cidade:
            query = query.filter_by(cidade=cidade)
        
        if estado:
            query = query.filter_by(estado=estado)
        
        if area:
            query = query.filter_by(area=area)
        
        # Ordenar por data de publicação (mais recentes primeiro)
        query = query.order_by(Job.data_publicacao.desc())
        
        # Paginação
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        jobs = pagination.items
        
        # Serializar dados
        job_schema = JobListSchema(many=True)
        return jsonify({
            'vagas': job_schema.dump(jobs),
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

@jobs_bp.route('/<int:job_id>', methods=['GET'])
def get_job(job_id):
    """Obter detalhes de uma vaga específica"""
    try:
        job = Job.query.get(job_id)
        if not job:
            return jsonify({'error': {'code': 'JOB_NOT_FOUND', 'message': 'Vaga não encontrada'}}), 404
        
        job_schema = JobSchema()
        return jsonify({'vaga': job_schema.dump(job)}), 200
        
    except Exception as e:
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@jobs_bp.route('', methods=['POST'])
@jwt_required()
def create_job():
    """Criar uma nova vaga (apenas empresas)"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'empresa':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Apenas empresas podem criar vagas'}}), 403
        
        # Verificar se a empresa existe
        company = Company.query.get(current_user['id'])
        if not company or not company.ativo:
            return jsonify({'error': {'code': 'COMPANY_NOT_FOUND', 'message': 'Empresa não encontrada'}}), 404
        
        schema = JobCreateSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify({'error': {'code': 'VALIDATION_ERROR', 'message': 'Dados inválidos', 'details': err.messages}}), 400
        
        # Criar vaga
        job = Job(empresa_id=current_user['id'], **data)
        db.session.add(job)
        db.session.commit()
        
        job_schema = JobSchema()
        return jsonify({
            'message': 'Vaga criada com sucesso',
            'vaga': job_schema.dump(job)
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@jobs_bp.route('/<int:job_id>', methods=['PUT'])
@jwt_required()
def update_job(job_id):
    """Atualizar uma vaga (apenas empresa dona)"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'empresa':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Apenas empresas podem atualizar vagas'}}), 403
        
        job = Job.query.get(job_id)
        if not job:
            return jsonify({'error': {'code': 'JOB_NOT_FOUND', 'message': 'Vaga não encontrada'}}), 404
        
        if job.empresa_id != current_user['id']:
            return jsonify({'error': {'code': 'FORBIDDEN', 'message': 'Você não tem permissão para editar esta vaga'}}), 403
        
        schema = JobUpdateSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify({'error': {'code': 'VALIDATION_ERROR', 'message': 'Dados inválidos', 'details': err.messages}}), 400
        
        # Atualizar campos
        for key, value in data.items():
            if hasattr(job, key):
                setattr(job, key, value)
        
        db.session.commit()
        
        job_schema = JobSchema()
        return jsonify({
            'message': 'Vaga atualizada com sucesso',
            'vaga': job_schema.dump(job)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@jobs_bp.route('/<int:job_id>', methods=['DELETE'])
@jwt_required()
def delete_job(job_id):
    """Excluir uma vaga (apenas empresa dona)"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'empresa':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Apenas empresas podem excluir vagas'}}), 403
        
        job = Job.query.get(job_id)
        if not job:
            return jsonify({'error': {'code': 'JOB_NOT_FOUND', 'message': 'Vaga não encontrada'}}), 404
        
        if job.empresa_id != current_user['id']:
            return jsonify({'error': {'code': 'FORBIDDEN', 'message': 'Você não tem permissão para excluir esta vaga'}}), 403
        
        # Marcar como encerrada ao invés de excluir
        job.status = 'encerrada'
        db.session.commit()
        
        return jsonify({'message': 'Vaga encerrada com sucesso'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@jobs_bp.route('/company/<int:company_id>', methods=['GET'])
def get_company_jobs(company_id):
    """Obter vagas de uma empresa específica"""
    try:
        company = Company.query.get(company_id)
        if not company or not company.ativo:
            return jsonify({'error': {'code': 'COMPANY_NOT_FOUND', 'message': 'Empresa não encontrada'}}), 404
        
        # Parâmetros de paginação
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 50)
        
        # Query das vagas da empresa
        query = Job.query.filter_by(empresa_id=company_id, status='ativa').order_by(Job.data_publicacao.desc())
        
        # Paginação
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        jobs = pagination.items
        
        # Serializar dados
        job_schema = JobListSchema(many=True)
        return jsonify({
            'vagas': job_schema.dump(jobs),
            'empresa': company.to_dict(),
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

