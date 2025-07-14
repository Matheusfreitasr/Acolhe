from marshmallow import Schema, fields, validate, validates, ValidationError

class JobCreateSchema(Schema):
    """Schema para criação de vaga"""
    titulo = fields.Str(required=True, validate=validate.Length(min=5, max=200))
    descricao = fields.Str(required=True, validate=validate.Length(min=20))
    requisitos = fields.Str()
    beneficios = fields.Str()
    salario_min = fields.Decimal(places=2)
    salario_max = fields.Decimal(places=2)
    tipo_contrato = fields.Str(required=True, 
                              validate=validate.OneOf(['clt', 'pj', 'estagio', 'freelance', 'temporario']))
    modalidade = fields.Str(required=True, 
                           validate=validate.OneOf(['presencial', 'remoto', 'hibrido']))
    nivel_experiencia = fields.Str(required=True, 
                                  validate=validate.OneOf(['junior', 'pleno', 'senior', 'estagio']))
    area = fields.Str(validate=validate.Length(max=100))
    localizacao = fields.Str(validate=validate.Length(max=200))
    cidade = fields.Str(validate=validate.Length(max=100))
    estado = fields.Str(validate=validate.Length(max=50))
    vagas_disponiveis = fields.Int(validate=validate.Range(min=1), load_default=1)
    data_expiracao = fields.Date()

class JobUpdateSchema(Schema):
    """Schema para atualização de vaga"""
    titulo = fields.Str(validate=validate.Length(min=5, max=200))
    descricao = fields.Str(validate=validate.Length(min=20))
    requisitos = fields.Str()
    beneficios = fields.Str()
    salario_min = fields.Decimal(places=2)
    salario_max = fields.Decimal(places=2)
    tipo_contrato = fields.Str(validate=validate.OneOf(['clt', 'pj', 'estagio', 'freelance', 'temporario']))
    modalidade = fields.Str(validate=validate.OneOf(['presencial', 'remoto', 'hibrido']))
    nivel_experiencia = fields.Str(validate=validate.OneOf(['junior', 'pleno', 'senior', 'estagio']))
    area = fields.Str(validate=validate.Length(max=100))
    localizacao = fields.Str(validate=validate.Length(max=200))
    cidade = fields.Str(validate=validate.Length(max=100))
    estado = fields.Str(validate=validate.Length(max=50))
    vagas_disponiveis = fields.Int(validate=validate.Range(min=1))
    status = fields.Str(validate=validate.OneOf(['ativa', 'pausada', 'encerrada']))
    data_expiracao = fields.Date()

class JobSchema(Schema):
    """Schema principal da vaga"""
    id = fields.Int(dump_only=True)
    titulo = fields.Str()
    descricao = fields.Str()
    requisitos = fields.Str()
    beneficios = fields.Str()
    salario_min = fields.Decimal(places=2)
    salario_max = fields.Decimal(places=2)
    tipo_contrato = fields.Str()
    modalidade = fields.Str()
    nivel_experiencia = fields.Str()
    area = fields.Str()
    localizacao = fields.Str()
    cidade = fields.Str()
    estado = fields.Str()
    empresa_id = fields.Int()
    vagas_disponiveis = fields.Int()
    status = fields.Str()
    data_publicacao = fields.DateTime(dump_only=True)
    data_expiracao = fields.Date()
    data_atualizacao = fields.DateTime(dump_only=True)
    total_candidaturas = fields.Int(dump_only=True)
    empresa = fields.Nested('CompanyPublicSchema', dump_only=True)

class JobListSchema(Schema):
    """Schema para listagem de vagas (resumido)"""
    id = fields.Int(dump_only=True)
    titulo = fields.Str()
    descricao = fields.Str()
    salario_min = fields.Decimal(places=2)
    salario_max = fields.Decimal(places=2)
    tipo_contrato = fields.Str()
    modalidade = fields.Str()
    nivel_experiencia = fields.Str()
    cidade = fields.Str()
    estado = fields.Str()
    data_publicacao = fields.DateTime(dump_only=True)
    empresa = fields.Nested('CompanyPublicSchema', dump_only=True)
    total_candidaturas = fields.Int(dump_only=True)

