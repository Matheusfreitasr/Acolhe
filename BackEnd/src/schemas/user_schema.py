from marshmallow import Schema, fields, validate, validates, ValidationError

class UserRegistrationSchema(Schema):
    """Schema para registro de usuário"""
    nome = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    email = fields.Email(required=True)
    senha = fields.Str(required=True, validate=validate.Length(min=6))
    tipo_usuario = fields.Str(validate=validate.OneOf(['candidato', 'empresa']), 
                             load_default='candidato')
    telefone = fields.Str(validate=validate.Length(max=20))
    data_nascimento = fields.Date()
    genero = fields.Str(validate=validate.Length(max=50))
    orientacao_sexual = fields.Str(validate=validate.Length(max=50))
    identidade_genero = fields.Str(validate=validate.Length(max=50))

class UserLoginSchema(Schema):
    """Schema para login de usuário"""
    email = fields.Email(required=True)
    senha = fields.Str(required=True)

class UserUpdateSchema(Schema):
    """Schema para atualização de usuário"""
    nome = fields.Str(validate=validate.Length(min=2, max=100))
    telefone = fields.Str(validate=validate.Length(max=20))
    data_nascimento = fields.Date()
    genero = fields.Str(validate=validate.Length(max=50))
    orientacao_sexual = fields.Str(validate=validate.Length(max=50))
    identidade_genero = fields.Str(validate=validate.Length(max=50))

class UserSchema(Schema):
    """Schema principal do usuário"""
    id = fields.Int(dump_only=True)
    nome = fields.Str()
    email = fields.Email()
    tipo_usuario = fields.Str()
    telefone = fields.Str()
    data_nascimento = fields.Date()
    genero = fields.Str()
    orientacao_sexual = fields.Str()
    identidade_genero = fields.Str()
    curriculo_url = fields.Str()
    foto_perfil_url = fields.Str()
    ativo = fields.Bool()
    data_cadastro = fields.DateTime(dump_only=True)
    data_atualizacao = fields.DateTime(dump_only=True)

class UserPublicSchema(Schema):
    """Schema público do usuário (sem informações sensíveis)"""
    id = fields.Int(dump_only=True)
    nome = fields.Str()
    foto_perfil_url = fields.Str()
    data_cadastro = fields.DateTime(dump_only=True)

