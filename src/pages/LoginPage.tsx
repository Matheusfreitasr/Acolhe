import React from 'react';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

const LoginPage: React.FC = () => {
  return (
    <MainLayout>
      <Container>
        <h1>Login</h1>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Entrar</button>
        </form>
        <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
        <p><a href="#">Esqueci minha senha</a></p>
      </Container>
    </MainLayout>
  );
};

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
`;

export default LoginPage;
