from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Importar modelos na ordem correta para resolver dependências
from .user import User
from .company import Company  
from .job import Job
from .user_skill import UserSkill
from .application import Application

