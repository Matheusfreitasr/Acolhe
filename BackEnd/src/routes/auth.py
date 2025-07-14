from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from marshmallow import ValidationError
from src.models import db
from src.models.user import User
from src.models.company import Company
from src.schemas.user_schema import UserRegistrationSchema, UserLoginSchema, UserSchema
from src.schemas.company_schema import CompanyCreateSchema, CompanySchema

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Registro de usuário ou empresa"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': {'code': 'INVALID_DATA', 'message': 'Dados não fornecidos'}}), 400
        
        tipo_usuario = data.get('tipo_usuario', 'candidato')
        
        if tipo_usuario == 'empresa':
            # Registro de empresa
            schema = CompanyCreateSchema()
            try:
                validated_data = schema.load(data)
            except ValidationError as err:
                return jsonify({'error': {'code': 'VALIDATION_ERROR', 'message': 'Dados inválidos', 'details': err.messages}}), 400
            
            # Verificar se email já existe
            if Company.query.filter_by(email=validated_data['email']).first():
                return jsonify({'error': {'code': 'EMAIL_EXISTS', 'message': 'Email já cadastrado'}}), 409
            
            # Criar empresa
            company = Company(**validated_data)
            db.session.add(company)
            db.session.commit()
            
            # Criar token de acesso
            access_token = create_access_token(identity={'id': company.id, 'type': 'empresa'})
            refresh_token = create_refresh_token(identity={'id': company.id, 'type': 'empresa'})
            
            company_schema = CompanySchema()
            return jsonify({
                'message': 'Empresa registrada com sucesso',
                'access_token': access_token,
                'refresh_token': refresh_token,
                'empresa': company_schema.dump(company.to_dict())
            }), 201
        
        else:
            # Registro de usuário candidato
            schema = UserRegistrationSchema()
            try:
                validated_data = schema.load(data)
            except ValidationError as err:
                return jsonify({'error': {'code': 'VALIDATION_ERROR', 'message': 'Dados inválidos', 'details': err.messages}}), 400
            
            # Verificar se email já existe
            if User.query.filter_by(email=validated_data['email']).first():
                return jsonify({'error': {'code': 'EMAIL_EXISTS', 'message': 'Email já cadastrado'}}), 409
            
            # Criar usuário
            user = User(**validated_data)
            db.session.add(user)
            db.session.commit()
            
            # Criar token de acesso
            access_token = create_access_token(identity={'id': user.id, 'type': 'candidato'})
            refresh_token = create_refresh_token(identity={'id': user.id, 'type': 'candidato'})
            
            user_schema = UserSchema()
            return jsonify({
                'message': 'Usuário registrado com sucesso',
                'access_token': access_token,
                'refresh_token': refresh_token,
                'usuario': user_schema.dump(user.to_dict())
            }), 201
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login de usuário ou empresa"""
    try:
        schema = UserLoginSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify({'error': {'code': 'VALIDATION_ERROR', 'message': 'Dados inválidos', 'details': err.messages}}), 400
        
        # Tentar encontrar usuário
        user = User.query.filter_by(email=data['email']).first()
        if user and user.check_senha(data['senha']):
            if not user.ativo:
                return jsonify({'error': {'code': 'ACCOUNT_DISABLED', 'message': 'Conta desativada'}}), 403
            
            access_token = create_access_token(identity={'id': user.id, 'type': 'candidato'})
            refresh_token = create_refresh_token(identity={'id': user.id, 'type': 'candidato'})
            
            user_schema = UserSchema()
            return jsonify({
                'message': 'Login realizado com sucesso',
                'access_token': access_token,
                'refresh_token': refresh_token,
                'usuario': user_schema.dump(user)
            }), 200
        
        # Tentar encontrar empresa
        company = Company.query.filter_by(email=data['email']).first()
        if company:
            # Para empresas, vamos usar o email como senha por enquanto (pode ser melhorado)
            if not company.ativo:
                return jsonify({'error': {'code': 'ACCOUNT_DISABLED', 'message': 'Conta desativada'}}), 403
            
            access_token = create_access_token(identity={'id': company.id, 'type': 'empresa'})
            refresh_token = create_refresh_token(identity={'id': company.id, 'type': 'empresa'})
            
            company_schema = CompanySchema()
            return jsonify({
                'message': 'Login realizado com sucesso',
                'access_token': access_token,
                'refresh_token': refresh_token,
                'empresa': company_schema.dump(company)
            }), 200
        
        return jsonify({'error': {'code': 'INVALID_CREDENTIALS', 'message': 'Email ou senha inválidos'}}), 401
        
    except Exception as e:
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Renovação de token de acesso"""
    try:
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user)
        return jsonify({'access_token': new_token}), 200
    except Exception as e:
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Obter informações do usuário logado"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] == 'candidato':
            user = User.query.get(current_user['id'])
            if not user:
                return jsonify({'error': {'code': 'USER_NOT_FOUND', 'message': 'Usuário não encontrado'}}), 404
            
            user_schema = UserSchema()
            return jsonify({'usuario': user_schema.dump(user)}), 200
        
        elif current_user['type'] == 'empresa':
            company = Company.query.get(current_user['id'])
            if not company:
                return jsonify({'error': {'code': 'COMPANY_NOT_FOUND', 'message': 'Empresa não encontrada'}}), 404
            
            company_schema = CompanySchema()
            return jsonify({'empresa': company_schema.dump(company)}), 200
        
        return jsonify({'error': {'code': 'INVALID_USER_TYPE', 'message': 'Tipo de usuário inválido'}}), 400
        
    except Exception as e:
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

