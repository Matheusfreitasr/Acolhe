import React from 'react';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${props => props.theme.colors.progressWhite};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${props => props.theme.colors.textLight};
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(91, 134, 229, 0.2);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const VoluntariadoPage: React.FC = () => {
  return (
    <MainLayout>
      <FormContainer>
        <h1>Seja Voluntário(a)</h1>
        <p>Faça parte da nossa rede de apoio! Preencha o formulário abaixo para se cadastrar como voluntário(a).</p>
        
        <form onSubmit={(e) => e.preventDefault()}> {/* Placeholder submit handler */}
          <h2>Dados Pessoais</h2>
          <FormGroup>
            <label htmlFor="fullName">Nome Completo:</label>
            <input type="text" id="fullName" name="fullName" required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="phone">Telefone (Opcional):</label>
            <input type="tel" id="phone" name="phone" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="city">Cidade:</label>
            <input type="text" id="city" name="city" required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="state">Estado:</label>
            {/* Replace with a Select component later if needed */}
            <input type="text" id="state" name="state" required />
          </FormGroup>

          <h2>Área de Atuação e Formação</h2>
          <FormGroup>
            <label htmlFor="area">Área Principal de Atuação:</label>
            <select id="area" name="area" required>
              <option value="">Selecione...</option>
              <option value="saude_mental">Saúde Mental (Psicologia, Psiquiatria)</option>
              <option value="juridico">Jurídico (Advocacia)</option>
              <option value="assistencia_social">Assistência Social</option>
              <option value="saude_geral">Saúde Geral (Medicina, Enfermagem)</option>
              <option value="outra">Outra</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="formation">Formação/Especialidade:</label>
            <input type="text" id="formation" name="formation" placeholder="Ex: Psicólogo Clínico, Advogado Cível" required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="crp_oab">CRP/OAB (se aplicável):</label>
            <input type="text" id="crp_oab" name="crp_oab" />
          </FormGroup>

          <h2>Disponibilidade e Intenção</h2>
          <FormGroup>
            <label htmlFor="availability">Disponibilidade (Ex: Horas/semana, dias específicos):</label>
            <input type="text" id="availability" name="availability" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="intention">Breve Descrição / Carta de Intenção:</label>
            <textarea id="intention" name="intention" rows={5} placeholder="Conte-nos um pouco sobre você e por que deseja ser voluntário(a)."></textarea>
          </FormGroup>

          <button type="submit">Enviar Cadastro</button>
        </form>
      </FormContainer>
    </MainLayout>
  );
};

export default VoluntariadoPage;

