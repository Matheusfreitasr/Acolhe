from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from src.models import db
from src.models.user import User
from src.schemas.user_schema import UserUpdateSchema, UserSchema

users_bp = Blueprint('users', __name__)

@users_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Obter perfil do usuário logado"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'candidato':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Acesso negado'}}), 403
        
        user = User.query.get(current_user['id'])
        if not user:
            return jsonify({'error': {'code': 'USER_NOT_FOUND', 'message': 'Usuário não encontrado'}}), 404
        
        user_schema = UserSchema()
        return jsonify({'usuario': user_schema.dump(user)}), 200
        
    except Exception as e:
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@users_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Atualizar perfil do usuário logado"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'candidato':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Acesso negado'}}), 403
        
        user = User.query.get(current_user['id'])
        if not user:
            return jsonify({'error': {'code': 'USER_NOT_FOUND', 'message': 'Usuário não encontrado'}}), 404
        
        schema = UserUpdateSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify({'error': {'code': 'VALIDATION_ERROR', 'message': 'Dados inválidos', 'details': err.messages}}), 400
        
        # Atualizar campos
        for key, value in data.items():
            if hasattr(user, key):
                setattr(user, key, value)
        
        db.session.commit()
        
        user_schema = UserSchema()
        return jsonify({
            'message': 'Perfil atualizado com sucesso',
            'usuario': user_schema.dump(user)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@users_bp.route('/profile', methods=['DELETE'])
@jwt_required()
def delete_profile():
    """Excluir conta do usuário logado"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'candidato':
            return jsonify({'error': {'code': 'UNAUTHORIZED', 'message': 'Acesso negado'}}), 403
        
        user = User.query.get(current_user['id'])
        if not user:
            return jsonify({'error': {'code': 'USER_NOT_FOUND', 'message': 'Usuário não encontrado'}}), 404
        
        # Desativar usuário ao invés de excluir (soft delete)
        user.ativo = False
        db.session.commit()
        
        return jsonify({'message': 'Conta desativada com sucesso'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

@users_bp.route('/<int:user_id>', methods=['GET'])
def get_user_public(user_id):
    """Obter informações públicas de um usuário"""
    try:
        user = User.query.get(user_id)
        if not user or not user.ativo:
            return jsonify({'error': {'code': 'USER_NOT_FOUND', 'message': 'Usuário não encontrado'}}), 404
        
        from src.schemas.user_schema import UserPublicSchema
        user_schema = UserPublicSchema()
        return jsonify({'usuario': user_schema.dump(user)}), 200
        
    except Exception as e:
        return jsonify({'error': {'code': 'INTERNAL_ERROR', 'message': 'Erro interno do servidor'}}), 500

