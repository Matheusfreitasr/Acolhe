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

  h1, h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.textLight};
  }
`;

const QuemSomosPage: React.FC = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <h1>Quem Somos Nós</h1>

        <section>
          <h2>Nossa Missão</h2>
          <p>
            Nossa missão é criar um espaço digital seguro, acolhedor e informativo que conecte a comunidade LGBTQIAPN+ a uma rede de apoio voluntário qualificado. Buscamos fortalecer indivíduos, promover o bem-estar e combater as desigualdades, oferecendo acesso facilitado a serviços essenciais de saúde mental, assistência jurídica, apoio social e oportunidades de emprego.
          </p>
        </section>

        <section>
          <h2>Nossa Visão</h2>
          <p>
            Almejamos ser a principal plataforma de referência no Brasil para o apoio voluntário à comunidade LGBTQIAPN+, reconhecida pela qualidade dos serviços oferecidos, pelo impacto positivo na vida das pessoas e pelo compromisso com a diversidade, inclusão e os Objetivos de Desenvolvimento Sustentável (ODS 3 e 10).
          </p>
        </section>

        <section>
          <h2>Nossos Valores</h2>
          <ul>
            <li><strong>Acolhimento:</strong> Criar um ambiente onde todos se sintam seguros, respeitados e compreendidos.</li>
            <li><strong>Inclusão:</strong> Celebrar a diversidade em todas as suas formas e garantir acesso equitativo aos nossos serviços.</li>
            <li><strong>Empoderamento:</strong> Fornecer ferramentas, informações e conexões que fortaleçam a autonomia da comunidade.</li>
            <li><strong>Ética e Profissionalismo:</strong> Atuar com responsabilidade, confidencialidade e respeito em todas as interações.</li>
            <li><strong>Colaboração:</strong> Fomentar a parceria entre voluntários, entidades e a comunidade para construir uma rede de apoio sólida.</li>
            <li><strong>Esperança:</strong> Inspirar um futuro com mais igualdade, saúde e bem-estar para todas as pessoas LGBTQIAPN+.</li>
          </ul>
        </section>

        {/* Add section about the team if applicable */}
        {/* 
        <section>
          <h2>Nossa Equipe</h2>
          <p>Informações sobre a equipe idealizadora...</p>
        </section>
        */}
      </ContentContainer>
    </MainLayout>
  );
};

export default QuemSomosPage;

