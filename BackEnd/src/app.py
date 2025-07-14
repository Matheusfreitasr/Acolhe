import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from src.config import config
from src.models import db

def create_app(config_name=None):
    """Factory function para criar a aplicação Flask"""
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')
    
    app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
    
    # Configuração da aplicação
    app.config.from_object(config[config_name])
    
    # Inicialização das extensões
    db.init_app(app)
    CORS(app, origins=app.config['CORS_ORIGINS'])
    jwt = JWTManager(app)
    
    # Registro dos blueprints
    from src.routes.auth import auth_bp
    from src.routes.users import users_bp
    from src.routes.jobs import jobs_bp
    from src.routes.companies import companies_bp
    from src.routes.applications import applications_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(jobs_bp, url_prefix='/api/jobs')
    app.register_blueprint(companies_bp, url_prefix='/api/companies')
    app.register_blueprint(applications_bp, url_prefix='/api/applications')
    
    # Criação das tabelas do banco de dados
    with app.app_context():
        db.create_all()
    
    # Rota para servir o frontend React
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        """Serve o frontend React"""
        static_folder_path = app.static_folder
        if static_folder_path is None:
            return "Static folder not configured", 404

        if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
            return send_from_directory(static_folder_path, path)
        else:
            index_path = os.path.join(static_folder_path, 'index.html')
            if os.path.exists(index_path):
                return send_from_directory(static_folder_path, 'index.html')
            else:
                return "index.html not found", 404
    
    # Handlers de erro JWT
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return {'error': {'code': 'TOKEN_EXPIRED', 'message': 'Token expirado'}}, 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return {'error': {'code': 'INVALID_TOKEN', 'message': 'Token inválido'}}, 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return {'error': {'code': 'MISSING_TOKEN', 'message': 'Token de acesso necessário'}}, 401
    
    return app

