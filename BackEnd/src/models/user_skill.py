from src.models import db

class UserSkill(db.Model):
    """Modelo de habilidades do usuário"""
    __tablename__ = 'user_skills'
    
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    habilidade = db.Column(db.String(100), nullable=False)
    nivel = db.Column(db.Enum('basico', 'intermediario', 'avancado', name='nivel_habilidade_enum'), 
                     default='basico', nullable=False)
    
    def __init__(self, usuario_id, habilidade, nivel='basico'):
        """Inicializa uma nova habilidade do usuário"""
        self.usuario_id = usuario_id
        self.habilidade = habilidade
        self.nivel = nivel
    
    def to_dict(self):
        """Converte a habilidade para dicionário"""
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'habilidade': self.habilidade,
            'nivel': self.nivel
        }
    
    def __repr__(self):
        return f'<UserSkill {self.habilidade} ({self.nivel})>'

