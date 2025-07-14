from datetime import datetime
from src.models import db

class Application(db.Model):
    """Modelo de candidatura do sistema"""
    __tablename__ = 'applications'
    
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    vaga_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    
    # Informações da candidatura
    carta_apresentacao = db.Column(db.Text)
    status_candidatura = db.Column(db.Enum('enviada', 'em_analise', 'aprovada', 
                                         'rejeitada', 'entrevista_agendada', 
                                         name='status_candidatura_enum'), 
                                 default='enviada', nullable=False)
    
    # Timestamps
    data_candidatura = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, 
                               onupdate=datetime.utcnow, nullable=False)
    
    # Constraint para evitar candidaturas duplicadas
    __table_args__ = (
        db.UniqueConstraint('usuario_id', 'vaga_id', name='unique_application'),
    )
    
    def __init__(self, usuario_id, vaga_id, carta_apresentacao=None):
        """Inicializa uma nova candidatura"""
        self.usuario_id = usuario_id
        self.vaga_id = vaga_id
        self.carta_apresentacao = carta_apresentacao
    
    def to_dict(self, include_usuario=True, include_vaga=True):
        """Converte a candidatura para dicionário"""
        data = {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'vaga_id': self.vaga_id,
            'carta_apresentacao': self.carta_apresentacao,
            'status_candidatura': self.status_candidatura,
            'data_candidatura': self.data_candidatura.isoformat(),
            'data_atualizacao': self.data_atualizacao.isoformat()
        }
        
        if include_usuario and self.candidato:
            data['candidato'] = {
                'id': self.candidato.id,
                'nome': self.candidato.nome,
                'email': self.candidato.email,
                'foto_perfil_url': self.candidato.foto_perfil_url,
                'curriculo_url': self.candidato.curriculo_url
            }
        
        if include_vaga and self.vaga:
            data['vaga'] = {
                'id': self.vaga.id,
                'titulo': self.vaga.titulo,
                'empresa_nome': self.vaga.empresa.nome if self.vaga.empresa else None,
                'modalidade': self.vaga.modalidade,
                'tipo_contrato': self.vaga.tipo_contrato,
                'status': self.vaga.status
            }
            
        return data
    
    def update_status(self, novo_status):
        """Atualiza o status da candidatura"""
        valid_statuses = ['enviada', 'em_analise', 'aprovada', 'rejeitada', 'entrevista_agendada']
        if novo_status in valid_statuses:
            self.status_candidatura = novo_status
            self.data_atualizacao = datetime.utcnow()
            return True
        return False
    
    def can_be_updated_by_user(self, user_id):
        """Verifica se a candidatura pode ser atualizada pelo usuário"""
        return self.usuario_id == user_id
    
    def can_be_updated_by_company(self, company_id):
        """Verifica se a candidatura pode ser atualizada pela empresa"""
        return self.vaga.empresa_id == company_id
    
    def __repr__(self):
        return f'<Application {self.id}: User {self.usuario_id} -> Job {self.vaga_id}>'

