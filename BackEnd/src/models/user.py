from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """Modelo de usuário do sistema"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    senha_hash = db.Column(db.String(255), nullable=False)
    tipo_usuario = db.Column(db.Enum('candidato', 'empresa', name='tipo_usuario_enum'), 
                           nullable=False, default='candidato')
    
    # Informações pessoais (opcionais)
    telefone = db.Column(db.String(20))
    data_nascimento = db.Column(db.Date)
    genero = db.Column(db.String(50))
    orientacao_sexual = db.Column(db.String(50))
    identidade_genero = db.Column(db.String(50))
    
    # Arquivos e mídia
    curriculo_url = db.Column(db.String(255))
    foto_perfil_url = db.Column(db.String(255))
    
    # Controle de status
    ativo = db.Column(db.Boolean, default=True, nullable=False)
    
    # Timestamps
    data_cadastro = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, 
                               onupdate=datetime.utcnow, nullable=False)
    
    # Relacionamentos
    candidaturas = db.relationship('Application', backref='candidato', lazy='dynamic',
                                 cascade='all, delete-orphan')
    habilidades = db.relationship('UserSkill', backref='usuario', lazy='dynamic',
                                cascade='all, delete-orphan')
    
    def __init__(self, nome, email, senha, tipo_usuario='candidato', **kwargs):
        """Inicializa um novo usuário"""
        self.nome = nome
        self.email = email
        self.set_senha(senha)
        self.tipo_usuario = tipo_usuario
        
        # Define atributos opcionais
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
    
    def set_senha(self, senha):
        """Define a senha do usuário (com hash)"""
        self.senha_hash = generate_password_hash(senha)
    
    def check_senha(self, senha):
        """Verifica se a senha fornecida está correta"""
        return check_password_hash(self.senha_hash, senha)
    
    def to_dict(self, include_sensitive=False):
        """Converte o usuário para dicionário"""
        data = {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'tipo_usuario': self.tipo_usuario,
            'telefone': self.telefone,
            'data_nascimento': self.data_nascimento.isoformat() if self.data_nascimento else None,
            'genero': self.genero,
            'orientacao_sexual': self.orientacao_sexual,
            'identidade_genero': self.identidade_genero,
            'curriculo_url': self.curriculo_url,
            'foto_perfil_url': self.foto_perfil_url,
            'ativo': self.ativo,
            'data_cadastro': self.data_cadastro.isoformat(),
            'data_atualizacao': self.data_atualizacao.isoformat()
        }
        
        if include_sensitive:
            data['senha_hash'] = self.senha_hash
            
        return data
    
    def get_candidaturas_count(self):
        """Retorna o número de candidaturas do usuário"""
        return self.candidaturas.count()
    
    def get_habilidades_list(self):
        """Retorna lista de habilidades do usuário"""
        return [skill.to_dict() for skill in self.habilidades]
    
    def __repr__(self):
        return f'<User {self.email}>'

