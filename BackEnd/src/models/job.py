from datetime import datetime, date
from src.models import db

class Job(db.Model):
    """Modelo de vaga de emprego do sistema"""
    __tablename__ = 'jobs'
    
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    requisitos = db.Column(db.Text)
    beneficios = db.Column(db.Text)
    
    # Informações salariais
    salario_min = db.Column(db.Numeric(10, 2))
    salario_max = db.Column(db.Numeric(10, 2))
    
    # Tipo de contrato e modalidade
    tipo_contrato = db.Column(db.Enum('clt', 'pj', 'estagio', 'freelance', 'temporario', 
                                    name='tipo_contrato_enum'), nullable=False)
    modalidade = db.Column(db.Enum('presencial', 'remoto', 'hibrido', 
                                 name='modalidade_enum'), nullable=False)
    nivel_experiencia = db.Column(db.Enum('junior', 'pleno', 'senior', 'estagio', 
                                        name='nivel_experiencia_enum'), nullable=False)
    
    # Localização
    area = db.Column(db.String(100))
    localizacao = db.Column(db.String(200))
    cidade = db.Column(db.String(100))
    estado = db.Column(db.String(50))
    
    # Relacionamento com empresa
    empresa_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    
    # Controle de vagas
    vagas_disponiveis = db.Column(db.Integer, default=1, nullable=False)
    status = db.Column(db.Enum('ativa', 'pausada', 'encerrada', name='status_vaga_enum'), 
                      default='ativa', nullable=False)
    
    # Timestamps
    data_publicacao = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    data_expiracao = db.Column(db.Date)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, 
                               onupdate=datetime.utcnow, nullable=False)
    
    # Relacionamentos
    candidaturas = db.relationship('Application', backref='vaga', lazy='dynamic',
                                 cascade='all, delete-orphan')
    
    def __init__(self, titulo, descricao, tipo_contrato, modalidade, 
                 nivel_experiencia, empresa_id, **kwargs):
        """Inicializa uma nova vaga"""
        self.titulo = titulo
        self.descricao = descricao
        self.tipo_contrato = tipo_contrato
        self.modalidade = modalidade
        self.nivel_experiencia = nivel_experiencia
        self.empresa_id = empresa_id
        
        # Define atributos opcionais
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
    
    def to_dict(self, include_empresa=True):
        """Converte a vaga para dicionário"""
        data = {
            'id': self.id,
            'titulo': self.titulo,
            'descricao': self.descricao,
            'requisitos': self.requisitos,
            'beneficios': self.beneficios,
            'salario_min': float(self.salario_min) if self.salario_min else None,
            'salario_max': float(self.salario_max) if self.salario_max else None,
            'tipo_contrato': self.tipo_contrato,
            'modalidade': self.modalidade,
            'nivel_experiencia': self.nivel_experiencia,
            'area': self.area,
            'localizacao': self.localizacao,
            'cidade': self.cidade,
            'estado': self.estado,
            'empresa_id': self.empresa_id,
            'vagas_disponiveis': self.vagas_disponiveis,
            'status': self.status,
            'data_publicacao': self.data_publicacao.isoformat(),
            'data_expiracao': self.data_expiracao.isoformat() if self.data_expiracao else None,
            'data_atualizacao': self.data_atualizacao.isoformat(),
            'total_candidaturas': self.get_candidaturas_count()
        }
        
        if include_empresa and self.empresa:
            data['empresa'] = {
                'id': self.empresa.id,
                'nome': self.empresa.nome,
                'logo_url': self.empresa.logo_url,
                'cidade': self.empresa.cidade,
                'estado': self.empresa.estado
            }
            
        return data
    
    def get_candidaturas_count(self):
        """Retorna o número de candidaturas para esta vaga"""
        return self.candidaturas.count()
    
    def get_candidatos(self):
        """Retorna os candidatos desta vaga"""
        return [app.candidato for app in self.candidaturas]
    
    def is_expired(self):
        """Verifica se a vaga está expirada"""
        if self.data_expiracao:
            return date.today() > self.data_expiracao
        return False
    
    def is_available(self):
        """Verifica se a vaga está disponível para candidaturas"""
        return (self.status == 'ativa' and 
                not self.is_expired() and 
                self.vagas_disponiveis > 0)
    
    def __repr__(self):
        return f'<Job {self.titulo}>'

