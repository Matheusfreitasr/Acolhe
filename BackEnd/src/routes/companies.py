from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from src.models import db
from src.models.company import Company
from src.schemas.company_schema import CompanyUpdateSchema, CompanySchema, CompanyPublicSchema

companies_bp = Blueprint('companies', __name__)

@companies_bp.route('', methods=['GET'])
def list_companies():
    """Listar empresas com paginação"""
    try:
        # Parâmetros de paginação
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 50)
        
        # Parâmetros de filtro
        search = request.args.get('search', '')
        setor = request.args.get('setor')
        cidade = request.args.get('cidade')
        estado = request.args.get('estado')
        tamanho = request.args.get('tamanho')
        
        # Query base
        query = Company.query.filter_by(ativo=True)
        
        # Aplicar filtros
        if search:
            query = query.filter(Company.nome.contains(search))
        
        if setor:
            query = query.filter_by(setor=setor)
        
        if cidade:
            query = query.filter_by(cidade=cidade)
        
        if estado:
            query = query.filter_by(estado=estado)
        
        if tamanho:
            query = query.filter_by(tamanho_empresa=tamanho)
        
        # Ordenar por nome
        query = query.order_by(Company.nome)
        
        # Paginação
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        companies = pagination.items
        
        # Serializar dados
        company_schema = CompanyPublicSchema(many=True)
        return jsonify({
            'empresas': company_schema.dump(companies),
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

@companies_bp.route('/<int:company_id>', methods=['GET'])
def get_company(company_id):
    """Obter detalhes de uma empresa específica"""
    try:
        company = Company.query.get(company_id)
        if not company or not company.ativo:
            return jsonify({'error': {'code': 'COMPANY_NOT_FOUND', 'message': 'Empresa não encontrada'}}), 404
        
        company_schema = CompanySchema()
        return jsonify({'empresa': company_schema.dump(company)}), 200
        
    except Exception as e:
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@companies_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_company_profile():
    """Obter perfil da empresa logada"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'empresa':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Acesso negado'}}), 403
        
        company = Company.query.get(current_user['id'])
        if not company:
            return jsonify({'error': {'code': 'COMPANY_NOT_FOUND', 'message': 'Empresa não encontrada'}}), 404
        
        company_schema = CompanySchema()
        return jsonify({'empresa': company_schema.dump(company)}), 200
        
    except Exception as e:
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@companies_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_company_profile():
    """Atualizar perfil da empresa logada"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'empresa':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Acesso negado'}}), 403
        
        company = Company.query.get(current_user['id'])
        if not company:
            return jsonify({'error': {'code': 'COMPANY_NOT_FOUND', 'message': 'Empresa não encontrada'}}), 404
        
        schema = CompanyUpdateSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify({'error': {'code': 'VALIDATION_ERROR', 'message': 'Dados inválidos', 'details': err.messages}}), 400
        
        # Atualizar campos
        for key, value in data.items():
            if hasattr(company, key):
                setattr(company, key, value)
        
        db.session.commit()
        
        company_schema = CompanySchema()
        return jsonify({
            'message': 'Perfil da empresa atualizado com sucesso',
            'empresa': company_schema.dump(company)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@companies_bp.route('/profile', methods=['DELETE'])
@jwt_required()
def delete_company_profile():
    """Excluir conta da empresa logada"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'empresa':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Acesso negado'}}), 403
        
        company = Company.query.get(current_user['id'])
        if not company:
            return jsonify({'error': {'code': 'COMPANY_NOT_FOUND', 'message': 'Empresa não encontrada'}}), 404
        
        # Desativar empresa ao invés de excluir (soft delete)
        company.ativo = False
        db.session.commit()
        
        return jsonify({'message': 'Conta da empresa desativada com sucesso'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

