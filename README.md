# Squad 45 - Plataforma de Apoio LGBTQIAPN+ 
**Integrantes:** 
*   Anderson Roberto Silva Da Rosa
*   Lais De Oliveira Araújo Neves
*   Matheus Rabelo de Freitas
*   Tayrlan Silva Marques

## Sobre o Projeto

Este projeto uma Plataforma de Apoio LGBTQIAPN+, uma iniciativa que visa conectar a comunidade LGBTQIAPN+ a uma rede de apoio voluntário, informações e oportunidades com respeito e diversidade.

**Propósito:** Reunir entidades e profissionais para oferecer atendimento voluntário, incluindo:
*   Atendimentos online com profissionais da saúde mental.
*   Encaminhamentos para casas de acolhida.
*   Orientação jurídica.
*   Divulgação de vagas de emprego destinadas ao público LGBTQIAPN+.
*   Programação de eventos, palestras e workshops.

**Alinhamento com ODS:** O projeto está alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU:
*   **ODS 3 (Saúde e Bem-Estar):** Promovendo o acesso à saúde física e mental, prevenção de doenças e suporte emocional.
*   **ODS 10 (Redução das Desigualdades):** Incentivando a equidade, empregabilidade, representatividade e proteção dos direitos da comunidade LGBTQIAPN+.

**Tecnologias:** O frontend foi desenvolvido utilizando:
*   **React:** Biblioteca JavaScript para construção de interfaces de usuário.
*   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
*   **Vite:** Ferramenta de build rápida para desenvolvimento web moderno.
*   **Styled Components:** Biblioteca para estilização CSS-in-JS.
*   **React Router DOM:** Para gerenciamento de rotas.

## Instruções para Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

Certifique-se de ter o seguinte instalado:

1.  **Node.js e npm (ou Yarn):**
    *   Recomendamos a versão LTS (Long Term Support).
    *   Baixe em [nodejs.org](https://nodejs.org/).
    *   Verifique a instalação no terminal:
        ```bash
        node -v
        npm -v
        # ou yarn -v
        ```
2.  **Git:**
    *   Necessário para clonar o repositório.
    *   Baixe em [git-scm.com](https://git-scm.com/).

### Configuração

1.  **Clone o Repositório (se aplicável):**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd plataforma-lgbtqiapn-frontend
    ```
    *Substitua `<URL_DO_REPOSITORIO>` pela URL correta.*

2.  **Instale as Dependências:**
    Navegue até o diretório raiz do projeto no terminal e execute:
    ```bash
    npm install
    ```
    *Ou, se preferir usar Yarn:*
    ```bash
    yarn install
    ```

### Execução em Modo de Desenvolvimento

1.  **Inicie o Servidor:**
    No diretório raiz do projeto, execute:
    ```bash
    npm run dev
    ```
    *Ou, com Yarn:*
    ```bash
    yarn dev
    ```
2.  **Acesse a Aplicação:**
    Abra seu navegador e acesse o endereço fornecido no terminal ( `http://localhost:5173/` ). OU
    Deploy do FrontEnd: https://acolhe-three.vercel.app

### Gerando o Build para Produção

Para criar uma versão otimizada da aplicação para implantação:

1.  **Execute o Comando de Build:**
    ```bash
    npm run build
    ```
    *Ou, com Yarn:*
    ```bash
    yarn build
    ```
2.  **Arquivos de Build:**
    Os arquivos otimizados estarão disponíveis na pasta `dist`, prontos para serem hospedados em um servidor web.

## Estrutura do Projeto

```
plataforma-lgbtqiapn-frontend/
├── public/             # Arquivos estáticos
├── src/
│   ├── assets/         # Imagens, ícones
│   ├── components/     # Componentes reutilizáveis
│   ├── layouts/        # Estrutura das páginas
│   ├── pages/          # Componentes de página
│   ├── router/         # Configuração de rotas
│   ├── services/       # Chamadas de API (backend)
│   ├── styles/         # Estilos globais e tema
│   ├── App.tsx         # Componente raiz
│   └── main.tsx        # Ponto de entrada
├── .eslintrc.cjs       # Config ESLint
├── .gitignore
├── index.html
├── package.json        # Dependências e scripts
├── tsconfig.json       # Config TypeScript
├── vite.config.ts      # Config Vite
└── README.md           # Este arquivo
```

## Scripts Disponíveis

*   `dev`: Inicia o servidor de desenvolvimento.
*   `build`: Gera o build de produção.
*   `lint`: Executa o linter (ESLint) para análise de código.
*   `preview`: Pré-visualiza o build de produção localmente.

## Próximos Passos e Observações

*   **Integração com Backend:** As funcionalidades de CRUD (Cadastro, Edição, Listagem, Exclusão) e outras que dependem de dados dinâmicos precisam ser conectadas à API do backend (implementação necessária em `src/services/`).
*   **Testes:** Adicionar testes unitários e de integração é recomendado para garantir a qualidade.

---
