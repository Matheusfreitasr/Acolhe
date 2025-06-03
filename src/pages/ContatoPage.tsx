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
    min-height: 150px;
    resize: vertical;
  }
`;

const ContactInfo = styled.div`
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${props => props.theme.colors.border};

    h2 {
        margin-bottom: 1rem;
        color: ${props => props.theme.colors.primary};
    }

    p {
        margin-bottom: 0.5rem;
        color: ${props => props.theme.colors.textLight};
    }
`;

const ContatoPage: React.FC = () => {
  return (
    <MainLayout>
      <FormContainer>
        <h1>Contate-nos</h1>
        <p>Tem alguma dúvida, sugestão ou precisa de mais informações? Utilize o formulário abaixo ou nossos canais de contato.</p>

        <form onSubmit={(e) => e.preventDefault()}> {/* Placeholder submit handler */}
          <FormGroup>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="subject">Assunto:</label>
            <input type="text" id="subject" name="subject" required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="message">Mensagem:</label>
            <textarea id="message" name="message" rows={6} required></textarea>
          </FormGroup>
          <button type="submit">Enviar Mensagem</button>
        </form>

        {/* Optional: Add direct contact info if available */}
        <ContactInfo>
          <h2>Outros Canais</h2>
          <p><strong>Email:</strong> acolhe+@contato.org</p>
          <p><strong>Telefone:</strong> (XX) XXXX-XXXX</p>
          {/* Add social media links here */}
        </ContactInfo>

      </FormContainer>
    </MainLayout>
  );
};

export default ContatoPage;

