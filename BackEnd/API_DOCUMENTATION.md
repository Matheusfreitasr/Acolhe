# Documentação da API - Acolhe Backend

## Visão Geral

A API do Acolhe fornece endpoints RESTful para gerenciar usuários, empresas, vagas de emprego e candidaturas em uma plataforma inclusiva para a comunidade LGBTQIAPN+.

**Base URL:** `http://localhost:5000/api`

## Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Após o login bem-sucedido, você receberá um token de acesso que deve ser incluído no header `Authorization` das requisições protegidas.

**Formato do Header:**
```
Authorization: Bearer <seu_token_aqui>
```

## Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token inválido ou ausente |
| 403 | Forbidden - Acesso negado |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Conflito (ex: email já existe) |
| 500 | Internal Server Error - Erro interno |

## Formato de Erro Padrão

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos fornecidos",
    "details": {
      "email": ["Este campo é obrigatório"],
      "senha": ["A senha deve ter pelo menos 6 caracteres"]
    }
  }
}
```

---

## Endpoints de Autenticação

### POST /auth/register

Registra um novo usuário ou empresa na plataforma.

**Parâmetros do Body:**

```json
{
  "nome": "string (obrigatório, 2-100 caracteres)",
  "email": "string (obrigatório, formato email)",
  "senha": "string (obrigatório, mínimo 6 caracteres)",
  "tipo_usuario": "string (opcional, 'candidato' ou 'empresa', padrão: 'candidato')",
  "telefone": "string (opcional, máximo 20 caracteres)",
  "data_nascimento": "string (opcional, formato: YYYY-MM-DD)",
  "genero": "string (opcional, máximo 50 caracteres)",
  "orientacao_sexual": "string (opcional, máximo 50 caracteres)",
  "identidade_genero": "string (opcional, máximo 50 caracteres)"
}
```

**Para empresas, campos adicionais:**

```json
{
  "cnpj": "string (opcional, máximo 18 caracteres)",
  "endereco": "string (opcional)",
  "cidade": "string (opcional, máximo 100 caracteres)",
  "estado": "string (opcional, máximo 50 caracteres)",
  "cep": "string (opcional, máximo 10 caracteres)",
  "site": "string (opcional, formato URL)",
  "descricao": "string (opcional)",
  "setor": "string (opcional, máximo 100 caracteres)",
  "tamanho_empresa": "string (opcional, 'startup', 'pequena', 'media', 'grande')",
  "politicas_inclusivas": "string (opcional)"
}
```

**Resposta de Sucesso (201):**

```json
{
  "message": "Usuário registrado com sucesso",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "tipo_usuario": "candidato",
    "data_cadastro": "2024-01-15T10:30:00"
  }
}
```

### POST /auth/login

Autentica um usuário ou empresa existente.

**Parâmetros do Body:**

```json
{
  "email": "string (obrigatório)",
  "senha": "string (obrigatório)"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Login realizado com sucesso",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "tipo_usuario": "candidato"
  }
}
```

### POST /auth/refresh

Renova o token de acesso usando o refresh token.

**Headers:**
```
Authorization: Bearer <refresh_token>
```

**Resposta de Sucesso (200):**

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### GET /auth/me

Retorna informações do usuário/empresa logado.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Resposta de Sucesso (200):**

```json
{
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "tipo_usuario": "candidato",
    "telefone": "+55 11 99999-9999",
    "data_cadastro": "2024-01-15T10:30:00"
  }
}
```

---

## Endpoints de Usuários

### GET /users/profile

Obtém o perfil completo do usuário logado.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Resposta de Sucesso (200):**

```json
{
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "tipo_usuario": "candidato",
    "telefone": "+55 11 99999-9999",
    "data_nascimento": "1990-05-15",
    "genero": "Masculino",
    "orientacao_sexual": "Gay",
    "identidade_genero": "Homem cisgênero",
    "curriculo_url": null,
    "foto_perfil_url": null,
    "ativo": true,
    "data_cadastro": "2024-01-15T10:30:00",
    "data_atualizacao": "2024-01-15T10:30:00"
  }
}
```

### PUT /users/profile

Atualiza o perfil do usuário logado.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parâmetros do Body (todos opcionais):**

```json
{
  "nome": "string (2-100 caracteres)",
  "telefone": "string (máximo 20 caracteres)",
  "data_nascimento": "string (formato: YYYY-MM-DD)",
  "genero": "string (máximo 50 caracteres)",
  "orientacao_sexual": "string (máximo 50 caracteres)",
  "identidade_genero": "string (máximo 50 caracteres)"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Perfil atualizado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "João Silva Santos",
    "email": "joao@exemplo.com",
    "telefone": "+55 11 88888-8888"
  }
}
```

### DELETE /users/profile

Desativa a conta do usuário logado (soft delete).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Conta desativada com sucesso"
}
```

### GET /users/{user_id}

Obtém informações públicas de um usuário específico.

**Parâmetros da URL:**
- `user_id`: ID do usuário

**Resposta de Sucesso (200):**

```json
{
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "foto_perfil_url": null,
    "data_cadastro": "2024-01-15T10:30:00"
  }
}
```

---

## Endpoints de Empresas

### GET /companies

Lista empresas com paginação e filtros.

**Parâmetros de Query (opcionais):**
- `page`: Número da página (padrão: 1)
- `per_page`: Itens por página (padrão: 10, máximo: 50)
- `search`: Busca por nome da empresa
- `setor`: Filtro por setor
- `cidade`: Filtro por cidade
- `estado`: Filtro por estado
- `tamanho`: Filtro por tamanho da empresa

**Exemplo:**
```
GET /companies?page=1&per_page=10&cidade=São Paulo&setor=Tecnologia
```

**Resposta de Sucesso (200):**

```json
{
  "empresas": [
    {
      "id": 1,
      "nome": "Tech Inclusiva LTDA",
      "logo_url": null,
      "cidade": "São Paulo",
      "estado": "SP",
      "setor": "Tecnologia",
      "tamanho_empresa": "media"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 25,
    "pages": 3,
    "has_next": true,
    "has_prev": false
  }
}
```

### GET /companies/{company_id}

Obtém detalhes completos de uma empresa específica.

**Parâmetros da URL:**
- `company_id`: ID da empresa

**Resposta de Sucesso (200):**

```json
{
  "empresa": {
    "id": 1,
    "nome": "Tech Inclusiva LTDA",
    "cnpj": "12.345.678/0001-90",
    "email": "contato@techinclusiva.com",
    "telefone": "+55 11 3333-4444",
    "endereco": "Rua da Inclusão, 123",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01234-567",
    "site": "https://techinclusiva.com",
    "descricao": "Empresa de tecnologia focada em diversidade e inclusão",
    "setor": "Tecnologia",
    "tamanho_empresa": "media",
    "politicas_inclusivas": "Políticas ativas de diversidade LGBTQIAPN+",
    "ativo": true,
    "data_cadastro": "2024-01-10T09:00:00",
    "total_vagas": 5
  }
}
```

### GET /companies/profile

Obtém o perfil da empresa logada.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Resposta:** Igual ao GET /companies/{company_id}

### PUT /companies/profile

Atualiza o perfil da empresa logada.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parâmetros do Body (todos opcionais):**

```json
{
  "nome": "string (2-150 caracteres)",
  "telefone": "string (máximo 20 caracteres)",
  "endereco": "string",
  "cidade": "string (máximo 100 caracteres)",
  "estado": "string (máximo 50 caracteres)",
  "cep": "string (máximo 10 caracteres)",
  "site": "string (formato URL)",
  "descricao": "string",
  "setor": "string (máximo 100 caracteres)",
  "tamanho_empresa": "string ('startup', 'pequena', 'media', 'grande')",
  "politicas_inclusivas": "string"
}
```

### DELETE /companies/profile

Desativa a conta da empresa logada.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Conta da empresa desativada com sucesso"
}
```

---

## Endpoints de Vagas

### GET /jobs

Lista vagas com paginação e filtros.

**Parâmetros de Query (opcionais):**
- `page`: Número da página (padrão: 1)
- `per_page`: Itens por página (padrão: 10, máximo: 50)
- `search`: Busca por título, descrição ou requisitos
- `tipo_contrato`: Filtro por tipo de contrato
- `modalidade`: Filtro por modalidade
- `nivel_experiencia`: Filtro por nível de experiência
- `cidade`: Filtro por cidade
- `estado`: Filtro por estado
- `area`: Filtro por área

**Exemplo:**
```
GET /jobs?modalidade=remoto&nivel_experiencia=junior&area=Tecnologia
```

**Resposta de Sucesso (200):**

```json
{
  "vagas": [
    {
      "id": 1,
      "titulo": "Desenvolvedor Python Jr - Vaga Inclusiva",
      "descricao": "Vaga para desenvolvedor Python júnior...",
      "salario_min": 3000.00,
      "salario_max": 5000.00,
      "tipo_contrato": "clt",
      "modalidade": "remoto",
      "nivel_experiencia": "junior",
      "cidade": "São Paulo",
      "estado": "SP",
      "data_publicacao": "2024-01-15T14:30:00",
      "empresa": {
        "id": 1,
        "nome": "Tech Inclusiva LTDA",
        "logo_url": null,
        "cidade": "São Paulo",
        "estado": "SP"
      },
      "total_candidaturas": 12
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 45,
    "pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

### GET /jobs/{job_id}

Obtém detalhes completos de uma vaga específica.

**Parâmetros da URL:**
- `job_id`: ID da vaga

**Resposta de Sucesso (200):**

```json
{
  "vaga": {
    "id": 1,
    "titulo": "Desenvolvedor Python Jr - Vaga Inclusiva",
    "descricao": "Vaga para desenvolvedor Python júnior em empresa que valoriza a diversidade LGBTQIAPN+. Você trabalhará em projetos inovadores...",
    "requisitos": "- Python 3.x\n- Flask ou Django\n- Git\n- Conhecimento em SQL",
    "beneficios": "- Vale refeição\n- Plano de saúde\n- Ambiente inclusivo\n- Home office",
    "salario_min": 3000.00,
    "salario_max": 5000.00,
    "tipo_contrato": "clt",
    "modalidade": "remoto",
    "nivel_experiencia": "junior",
    "area": "Tecnologia",
    "localizacao": "São Paulo - SP (Remoto)",
    "cidade": "São Paulo",
    "estado": "SP",
    "empresa_id": 1,
    "vagas_disponiveis": 2,
    "status": "ativa",
    "data_publicacao": "2024-01-15T14:30:00",
    "data_expiracao": "2024-02-15",
    "data_atualizacao": "2024-01-15T14:30:00",
    "total_candidaturas": 12,
    "empresa": {
      "id": 1,
      "nome": "Tech Inclusiva LTDA",
      "logo_url": null,
      "cidade": "São Paulo",
      "estado": "SP"
    }
  }
}
```

### POST /jobs

Cria uma nova vaga (apenas empresas).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parâmetros do Body:**

```json
{
  "titulo": "string (obrigatório, 5-200 caracteres)",
  "descricao": "string (obrigatório, mínimo 20 caracteres)",
  "requisitos": "string (opcional)",
  "beneficios": "string (opcional)",
  "salario_min": "number (opcional, decimal)",
  "salario_max": "number (opcional, decimal)",
  "tipo_contrato": "string (obrigatório, 'clt', 'pj', 'estagio', 'freelance', 'temporario')",
  "modalidade": "string (obrigatório, 'presencial', 'remoto', 'hibrido')",
  "nivel_experiencia": "string (obrigatório, 'junior', 'pleno', 'senior', 'estagio')",
  "area": "string (opcional, máximo 100 caracteres)",
  "localizacao": "string (opcional, máximo 200 caracteres)",
  "cidade": "string (opcional, máximo 100 caracteres)",
  "estado": "string (opcional, máximo 50 caracteres)",
  "vagas_disponiveis": "integer (opcional, mínimo 1, padrão: 1)",
  "data_expiracao": "string (opcional, formato: YYYY-MM-DD)"
}
```

**Resposta de Sucesso (201):**

```json
{
  "message": "Vaga criada com sucesso",
  "vaga": {
    "id": 1,
    "titulo": "Desenvolvedor Python Jr - Vaga Inclusiva",
    "empresa_id": 1,
    "status": "ativa",
    "data_publicacao": "2024-01-15T14:30:00"
  }
}
```

### PUT /jobs/{job_id}

Atualiza uma vaga existente (apenas empresa dona).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parâmetros da URL:**
- `job_id`: ID da vaga

**Parâmetros do Body:** Mesmos campos do POST, todos opcionais, incluindo:

```json
{
  "status": "string ('ativa', 'pausada', 'encerrada')"
}
```

### DELETE /jobs/{job_id}

Encerra uma vaga (marca como 'encerrada', não exclui).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parâmetros da URL:**
- `job_id`: ID da vaga

**Resposta de Sucesso (200):**

```json
{
  "message": "Vaga encerrada com sucesso"
}
```

### GET /jobs/company/{company_id}

Lista vagas de uma empresa específica.

**Parâmetros da URL:**
- `company_id`: ID da empresa

**Parâmetros de Query:** Mesmos do GET /jobs

**Resposta:** Similar ao GET /jobs, mas inclui informações da empresa

---

## Endpoints de Candidaturas

### POST /applications

Candidata-se a uma vaga (apenas candidatos).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parâmetros do Body:**

```json
{
  "vaga_id": "integer (obrigatório)",
  "carta_apresentacao": "string (opcional)"
}
```

**Resposta de Sucesso (201):**

```json
{
  "message": "Candidatura enviada com sucesso",
  "candidatura": {
    "id": 1,
    "usuario_id": 1,
    "vaga_id": 1,
    "status_candidatura": "enviada",
    "data_candidatura": "2024-01-16T10:15:00"
  }
}
```

### GET /applications/my

Lista candidaturas do usuário logado.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parâmetros de Query (opcionais):**
- `page`: Número da página (padrão: 1)
- `per_page`: Itens por página (padrão: 10, máximo: 50)

**Resposta de Sucesso (200):**

```json
{
  "candidaturas": [
    {
      "id": 1,
      "status_candidatura": "em_analise",
      "data_candidatura": "2024-01-16T10:15:00",
      "vaga": {
        "id": 1,
        "titulo": "Desenvolvedor Python Jr",
        "empresa_nome": "Tech Inclusiva LTDA",
        "modalidade": "remoto",
        "tipo_contrato": "clt",
        "status": "ativa"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 3,
    "pages": 1,
    "has_next": false,
    "has_prev": false
  }
}
```

### GET /applications/{application_id}

Obtém detalhes de uma candidatura específica.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parâmetros da URL:**
- `application_id`: ID da candidatura

**Resposta de Sucesso (200):**

```json
{
  "candidatura": {
    "id": 1,
    "usuario_id": 1,
    "vaga_id": 1,
    "carta_apresentacao": "Tenho muito interesse nesta vaga...",
    "status_candidatura": "em_analise",
    "data_candidatura": "2024-01-16T10:15:00",
    "data_atualizacao": "2024-01-16T15:30:00",
    "candidato": {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@exemplo.com",
      "foto_perfil_url": null,
      "curriculo_url": null
    },
    "vaga": {
      "id": 1,
      "titulo": "Desenvolvedor Python Jr",
      "empresa_nome": "Tech Inclusiva LTDA",
      "modalidade": "remoto",
      "tipo_contrato": "clt",
      "status": "ativa"
    }
  }
}
```

### PUT /applications/{application_id}/status

Atualiza o status de uma candidatura (apenas empresa dona da vaga).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parâmetros da URL:**
- `application_id`: ID da candidatura

**Parâmetros do Body:**

```json
{
  "status_candidatura": "string ('enviada', 'em_analise', 'aprovada', 'rejeitada', 'entrevista_agendada')"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Status da candidatura atualizado com sucesso",
  "candidatura": {
    "id": 1,
    "status_candidatura": "aprovada",
    "data_atualizacao": "2024-01-17T09:45:00"
  }
}
```

### GET /applications/job/{job_id}

Lista candidatos de uma vaga específica (apenas empresa dona).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parâmetros da URL:**
- `job_id`: ID da vaga

**Parâmetros de Query (opcionais):**
- `page`: Número da página (padrão: 1)
- `per_page`: Itens por página (padrão: 10, máximo: 50)
- `status`: Filtro por status da candidatura

**Resposta de Sucesso (200):**

```json
{
  "candidaturas": [
    {
      "id": 1,
      "status_candidatura": "em_analise",
      "data_candidatura": "2024-01-16T10:15:00",
      "candidato": {
        "id": 1,
        "nome": "João Silva",
        "foto_perfil_url": null
      }
    }
  ],
  "vaga": {
    "id": 1,
    "titulo": "Desenvolvedor Python Jr",
    "status": "ativa"
  },
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 12,
    "pages": 2,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## Códigos de Erro Específicos

### Autenticação
- `INVALID_CREDENTIALS`: Email ou senha incorretos
- `EMAIL_EXISTS`: Email já cadastrado
- `TOKEN_EXPIRED`: Token JWT expirado
- `INVALID_TOKEN`: Token JWT inválido
- `MISSING_TOKEN`: Token de acesso necessário

### Autorização
- `UNAUTHORIZED`: Acesso negado
- `FORBIDDEN`: Operação não permitida

### Recursos
- `USER_NOT_FOUND`: Usuário não encontrado
- `COMPANY_NOT_FOUND`: Empresa não encontrada
- `JOB_NOT_FOUND`: Vaga não encontrada
- `APPLICATION_NOT_FOUND`: Candidatura não encontrada

### Candidaturas
- `ALREADY_APPLIED`: Usuário já se candidatou a esta vaga
- `JOB_NOT_AVAILABLE`: Vaga não está disponível para candidaturas

### Validação
- `VALIDATION_ERROR`: Dados de entrada inválidos

---

## Limitações e Considerações

1. **Rate Limiting:** Não implementado na versão atual
2. **Upload de Arquivos:** Não implementado (URLs são armazenadas como strings)
3. **Notificações:** Não implementadas na versão atual
4. **Busca Avançada:** Busca simples por texto, sem indexação full-text
5. **Paginação:** Máximo de 50 itens por página

## Versionamento

Esta é a versão 1.0 da API. Futuras versões manterão compatibilidade com esta versão através de versionamento na URL (ex: `/api/v2/`).

---

**Última atualização:** Janeiro 2024

