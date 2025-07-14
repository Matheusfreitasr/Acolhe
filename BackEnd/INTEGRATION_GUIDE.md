# Guia de Integração Front-end React + Back-end Flask

## Visão Geral

Este guia fornece instruções detalhadas para integrar o front-end React existente do projeto Acolhe com o back-end Flask desenvolvido.

## Configuração do CORS

O back-end já está configurado para aceitar requisições do front-end React. As origens permitidas estão definidas no arquivo `.env`:

```env
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

Ajuste conforme necessário para incluir outras portas ou domínios.

## URLs Base da API

### Desenvolvimento
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Produção
```javascript
const API_BASE_URL = 'https://seu-dominio.com/api';
```

## Configuração do Cliente HTTP

### Usando Axios (Recomendado)

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se token expirou, tentar renovar
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
            headers: { Authorization: `Bearer ${refreshToken}` }
          });
          
          const newToken = response.data.access_token;
          localStorage.setItem('access_token', newToken);
          
          // Repetir requisição original com novo token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh falhou, redirecionar para login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

## Serviços de Autenticação

### AuthService

```javascript
// src/services/authService.js
import api from './api';

class AuthService {
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      const { access_token, refresh_token, usuario } = response.data;
      
      // Armazenar tokens
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('user', JSON.stringify(usuario));
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(email, senha) {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { access_token, refresh_token, usuario } = response.data;
      
      // Armazenar tokens
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('user', JSON.stringify(usuario));
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  }

  async getProfile() {
    try {
      const response = await api.get('/auth/me');
      return response.data.usuario;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response?.data?.error) {
      return new Error(error.response.data.error.message);
    }
    return new Error('Erro de conexão com o servidor');
  }
}

export default new AuthService();
```

## Serviços de Vagas

### JobService

```javascript
// src/services/jobService.js
import api from './api';

class JobService {
  async getJobs(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });

      const response = await api.get(`/jobs?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getJobById(id) {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data.vaga;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createJob(jobData) {
    try {
      const response = await api.post('/jobs', jobData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateJob(id, jobData) {
    try {
      const response = await api.put(`/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteJob(id) {
    try {
      const response = await api.delete(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response?.data?.error) {
      return new Error(error.response.data.error.message);
    }
    return new Error('Erro de conexão com o servidor');
  }
}

export default new JobService();
```

## Serviços de Candidaturas

### ApplicationService

```javascript
// src/services/applicationService.js
import api from './api';

class ApplicationService {
  async applyToJob(vagaId, cartaApresentacao = '') {
    try {
      const response = await api.post('/applications', {
        vaga_id: vagaId,
        carta_apresentacao: cartaApresentacao
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMyApplications(page = 1, perPage = 10) {
    try {
      const response = await api.get(`/applications/my?page=${page}&per_page=${perPage}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getApplicationById(id) {
    try {
      const response = await api.get(`/applications/${id}`);
      return response.data.candidatura;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateApplicationStatus(id, status) {
    try {
      const response = await api.put(`/applications/${id}/status`, {
        status_candidatura: status
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getJobApplications(jobId, page = 1, perPage = 10, status = '') {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString()
      });
      
      if (status) {
        params.append('status', status);
      }

      const response = await api.get(`/applications/job/${jobId}?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response?.data?.error) {
      return new Error(error.response.data.error.message);
    }
    return new Error('Erro de conexão com o servidor');
  }
}

export default new ApplicationService();
```

## Context de Autenticação

### AuthContext

```javascript
// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getProfile();
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await authService.login(email, senha);
      setUser(response.usuario);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.usuario || response.empresa);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Componente de Rota Protegida

### ProtectedRoute

```javascript
// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredUserType = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredUserType && user.tipo_usuario !== requiredUserType) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

## Hooks Personalizados

### useJobs

```javascript
// src/hooks/useJobs.js
import { useState, useEffect } from 'react';
import jobService from '../services/jobService';

export const useJobs = (filters = {}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobService.getJobs(filters);
        setJobs(response.vagas);
        setPagination(response.pagination);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [JSON.stringify(filters)]);

  return { jobs, loading, error, pagination };
};
```

## Tratamento de Erros

### ErrorBoundary

```javascript
// src/components/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Algo deu errado!</h2>
          <p>Ocorreu um erro inesperado. Tente recarregar a página.</p>
          <button onClick={() => window.location.reload()}>
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Configuração de Variáveis de Ambiente

### .env (Front-end)

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Acolhe
```

## Exemplo de Integração Completa

### Página de Login

```javascript
// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.senha);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Entrar no Acolhe</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
```

## Checklist de Integração

### ✅ Configuração Inicial
- [ ] Instalar axios no front-end: `npm install axios`
- [ ] Configurar variáveis de ambiente (.env)
- [ ] Criar instância configurada do axios
- [ ] Implementar interceptors para tokens

### ✅ Autenticação
- [ ] Implementar AuthService
- [ ] Criar AuthContext
- [ ] Implementar ProtectedRoute
- [ ] Configurar redirecionamento automático

### ✅ Serviços
- [ ] Implementar JobService
- [ ] Implementar ApplicationService
- [ ] Implementar CompanyService (se necessário)
- [ ] Implementar UserService

### ✅ Componentes
- [ ] Atualizar formulários de login/registro
- [ ] Atualizar listagem de vagas
- [ ] Implementar candidatura a vagas
- [ ] Atualizar perfil de usuário/empresa

### ✅ Tratamento de Erros
- [ ] Implementar ErrorBoundary
- [ ] Adicionar tratamento de erros nos serviços
- [ ] Implementar notificações de erro/sucesso

### ✅ Testes
- [ ] Testar fluxo completo de autenticação
- [ ] Testar CRUD de vagas
- [ ] Testar candidaturas
- [ ] Testar responsividade

## Comandos Úteis

### Iniciar Desenvolvimento
```bash
# Terminal 1 - Back-end
cd acolhe-backend
source venv/bin/activate
python src/main.py

# Terminal 2 - Front-end
cd acolhe-frontend
npm start
```

### Verificar Conectividade
```bash
# Testar se a API está respondendo
curl http://localhost:5000/api/auth/me

# Testar CORS
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:5000/api/auth/login
```

## Troubleshooting

### Problemas Comuns

1. **Erro de CORS**
   - Verificar se a origem está configurada no back-end
   - Verificar se o Flask-CORS está instalado

2. **Token Expirado**
   - Implementar refresh automático
   - Verificar se o interceptor está funcionando

3. **Erro 404 nas Rotas**
   - Verificar se a URL base está correta
   - Verificar se o back-end está rodando

4. **Erro de Validação**
   - Verificar formato dos dados enviados
   - Consultar documentação da API

---

**Este guia fornece uma base sólida para integrar o front-end React com o back-end Flask do projeto Acolhe.**

