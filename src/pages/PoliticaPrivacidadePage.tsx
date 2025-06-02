import React from 'react';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h1 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.textLight};
  }
`;

const PoliticaPrivacidadePage: React.FC = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <h1>Política de Privacidade</h1>
        <p>Placeholder para o conteúdo da Política de Privacidade.</p>
        {/* O conteúdo detalhado será adicionado posteriormente */}
      </ContentContainer>
    </MainLayout>
  );
};

export default PoliticaPrivacidadePage;

