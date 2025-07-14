from marshmallow import Schema, fields, validate

class ApplicationCreateSchema(Schema):
    """Schema para criação de candidatura"""
    vaga_id = fields.Int(required=True)
    carta_apresentacao = fields.Str()

class ApplicationUpdateSchema(Schema):
    """Schema para atualização de candidatura"""
    status_candidatura = fields.Str(validate=validate.OneOf([
        'enviada', 'em_analise', 'aprovada', 'rejeitada', 'entrevista_agendada'
    ]))

class ApplicationSchema(Schema):
    """Schema principal da candidatura"""
    id = fields.Int(dump_only=True)
    usuario_id = fields.Int()
    vaga_id = fields.Int()
    carta_apresentacao = fields.Str()
    status_candidatura = fields.Str()
    data_candidatura = fields.DateTime(dump_only=True)
    data_atualizacao = fields.DateTime(dump_only=True)
    candidato = fields.Nested('UserPublicSchema', dump_only=True)
    vaga = fields.Nested('JobListSchema', dump_only=True)

class ApplicationListSchema(Schema):
    """Schema para listagem de candidaturas"""
    id = fields.Int(dump_only=True)
    status_candidatura = fields.Str()
    data_candidatura = fields.DateTime(dump_only=True)
    candidato = fields.Nested('UserPublicSchema', dump_only=True)
    vaga = fields.Nested('JobListSchema', dump_only=True)

