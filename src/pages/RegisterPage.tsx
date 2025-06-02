import React from 'react';

const RegisterPage: React.FC = () => {
  return (
    <div>
      <h1>Cadastro</h1>
      {/* Formulário de cadastro será adicionado aqui */}
      <form>
        <div>
          <label htmlFor="name">Nome Completo:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required />
        </div>
        {/* Adicionar campos para tipo de usuário (busca ajuda / voluntário) */}
        <button type="submit">Cadastrar</button>
      </form>
      <p>Já tem uma conta? <a href="/login">Faça login</a></p>
    </div>
  );
};

export default RegisterPage;

