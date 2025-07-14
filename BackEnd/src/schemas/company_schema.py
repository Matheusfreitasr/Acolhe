from marshmallow import Schema, fields, validate

class CompanyCreateSchema(Schema):
    """Schema para criação de empresa"""
    nome = fields.Str(required=True, validate=validate.Length(min=2, max=150))
    cnpj = fields.Str(validate=validate.Length(max=18))
    email = fields.Email(required=True)
    telefone = fields.Str(validate=validate.Length(max=20))
    endereco = fields.Str()
    cidade = fields.Str(validate=validate.Length(max=100))
    estado = fields.Str(validate=validate.Length(max=50))
    cep = fields.Str(validate=validate.Length(max=10))
    site = fields.Url()
    descricao = fields.Str()
    setor = fields.Str(validate=validate.Length(max=100))
    tamanho_empresa = fields.Str(validate=validate.OneOf(['startup', 'pequena', 'media', 'grande']), 
                                load_default='pequena')
    politicas_inclusivas = fields.Str()

class CompanyUpdateSchema(Schema):
    """Schema para atualização de empresa"""
    nome = fields.Str(validate=validate.Length(min=2, max=150))
    telefone = fields.Str(validate=validate.Length(max=20))
    endereco = fields.Str()
    cidade = fields.Str(validate=validate.Length(max=100))
    estado = fields.Str(validate=validate.Length(max=50))
    cep = fields.Str(validate=validate.Length(max=10))
    site = fields.Url()
    descricao = fields.Str()
    setor = fields.Str(validate=validate.Length(max=100))
    tamanho_empresa = fields.Str(validate=validate.OneOf(['startup', 'pequena', 'media', 'grande']))
    politicas_inclusivas = fields.Str()

class CompanySchema(Schema):
    """Schema principal da empresa"""
    id = fields.Int(dump_only=True)
    nome = fields.Str()
    cnpj = fields.Str()
    email = fields.Email()
    telefone = fields.Str()
    endereco = fields.Str()
    cidade = fields.Str()
    estado = fields.Str()
    cep = fields.Str()
    site = fields.Url()
    descricao = fields.Str()
    logo_url = fields.Str()
    setor = fields.Str()
    tamanho_empresa = fields.Str()
    politicas_inclusivas = fields.Str()
    ativo = fields.Bool()
    data_cadastro = fields.DateTime(dump_only=True)
    data_atualizacao = fields.DateTime(dump_only=True)
    total_vagas = fields.Int(dump_only=True)

class CompanyPublicSchema(Schema):
    """Schema público da empresa (para listagens)"""
    id = fields.Int(dump_only=True)
    nome = fields.Str()
    logo_url = fields.Str()
    cidade = fields.Str()
    estado = fields.Str()
    setor = fields.Str()
    tamanho_empresa = fields.Str()

