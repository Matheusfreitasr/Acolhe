from datetime import datetime
from src.models import db

class Company(db.Model):
    """Modelo de empresa do sistema"""
    __tablename__ = 'companies'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    cnpj = db.Column(db.String(18), unique=True, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    telefone = db.Column(db.String(20))
    
    # Endereço
    endereco = db.Column(db.Text)
    cidade = db.Column(db.String(100))
    estado = db.Column(db.String(50))
    cep = db.Column(db.String(10))
    
    # Informações da empresa
    site = db.Column(db.String(255))
    descricao = db.Column(db.Text)
    logo_url = db.Column(db.String(255))
    setor = db.Column(db.String(100))
    tamanho_empresa = db.Column(db.Enum('startup', 'pequena', 'media', 'grande', 
                                      name='tamanho_empresa_enum'), default='pequena')
    
    # Políticas de inclusão
    politicas_inclusivas = db.Column(db.Text)
    
    # Controle de status
    ativo = db.Column(db.Boolean, default=True, nullable=False)
    
    # Timestamps
    data_cadastro = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, 
                               onupdate=datetime.utcnow, nullable=False)
    
    # Relacionamentos
    vagas = db.relationship('Job', backref='empresa', lazy='dynamic',
                          cascade='all, delete-orphan')
    
    def __init__(self, nome, email, **kwargs):
        """Inicializa uma nova empresa"""
        self.nome = nome
        self.email = email
        
        # Define atributos opcionais
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
    
    def to_dict(self):
        """Converte a empresa para dicionário"""
        return {
            'id': self.id,
            'nome': self.nome,
            'cnpj': self.cnpj,
            'email': self.email,
            'telefone': self.telefone,
            'endereco': self.endereco,
            'cidade': self.cidade,
            'estado': self.estado,
            'cep': self.cep,
            'site': self.site,
            'descricao': self.descricao,
            'logo_url': self.logo_url,
            'setor': self.setor,
            'tamanho_empresa': self.tamanho_empresa,
            'politicas_inclusivas': self.politicas_inclusivas,
            'ativo': self.ativo,
            'data_cadastro': self.data_cadastro.isoformat(),
            'data_atualizacao': self.data_atualizacao.isoformat(),
            'total_vagas': self.get_vagas_count()
        }
    
    def get_vagas_count(self):
        """Retorna o número de vagas da empresa"""
        return self.vagas.filter_by(status='ativa').count()
    
    def get_vagas_ativas(self):
        """Retorna as vagas ativas da empresa"""
        return self.vagas.filter_by(status='ativa').all()
    
    def __repr__(self):
        return f'<Company {self.nome}>'

