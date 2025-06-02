import React from 'react';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

import iconAtendimentos from '../assets/icon_atendimentos.png';
import iconVagas from '../assets/icon_vagas.png';
import iconProgramacao from '../assets/icon_programacao.png';
import iconLocaisApoio from '../assets/icon_locais_apoio.png';
import heroBackground from '../assets/hero_background.jpg';


const HeroSection = styled.section`
  text-align: center;
  padding: 6rem 2rem; 
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackground});
  background-size: cover; 
  background-position: center top;
  background-repeat: no-repeat;
  color: ${props => props.theme.colors.progressWhite};
  min-height: 400px;

  h1 {
    font-size: 2.8rem; 
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.9;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: 4rem 1rem;
      h1 { font-size: 2.2rem; }
      p { font-size: 1rem; }
  }
`;

const CtaButton = styled.button`
  background: ${props => props.theme.gradients.primaryDiagonal};
  color: ${props => props.theme.colors.progressWhite};
  padding: 0.8rem 1.8rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  margin: 0.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.3);
  }
`;

const SecondaryButton = styled(CtaButton)`
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
    &:hover {
        background: ${props => props.theme.colors.secondaryHover};
    }
`;

const ServicesSection = styled.section`
  padding: 4rem 2rem;
  background-color: ${props => props.theme.colors.background}; 
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background-color: ${props => props.theme.colors.progressWhite};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.card}; 
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  img {
      max-width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;
      object-fit: contain;
  }

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
  }

  p {
      color: ${props => props.theme.colors.textLight};
      font-size: 0.95rem;
      line-height: 1.5;
  }
`;

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection>
        <h1>Bem-vindo(a) à Plataforma de Apoio LGBTQIAPN+!</h1>
        <p>Conectando você a uma rede de apoio voluntário, informações e oportunidades com respeito e diversidade.</p>
        <div>
          <CtaButton>Buscar Ajuda</CtaButton>
          <SecondaryButton>Quero Ser Voluntário(a)</SecondaryButton>
        </div>
      </HeroSection>

      <ServicesSection>
        <ServiceCard>
          <img src={iconAtendimentos} alt="Ícone Atendimentos" />
          <h3>Atendimentos</h3>
          <p>Apoio jurídico, psicológico e social com profissionais voluntários.</p>
          {/* Add Link component later: <Link to="/atendimentos">Ver mais</Link> */}
        </ServiceCard>
        <ServiceCard>
          <img src={iconVagas} alt="Ícone Vagas de Emprego" />
          <h3>Vagas de Emprego</h3>
          <p>Oportunidades em empresas que valorizam a diversidade e inclusão.</p>
          {/* <Link to="/vagas">Ver mais</Link> */}
        </ServiceCard>
        <ServiceCard>
          <img src={iconProgramacao} alt="Ícone Programação" />
          <h3>Programação</h3>
          <p>Participe de eventos, palestras e workshops online e presenciais.</p>
          {/* <Link to="/programacao">Ver mais</Link> */}
        </ServiceCard>
        <ServiceCard>
          <img src={iconLocaisApoio} alt="Ícone Locais de Apoio" />
          <h3>Locais de Apoio</h3>
          <p>Encontre casas de acolhida e outras instituições parceiras perto de você.</p>
          {/* <Link to="/locais-referencia">Ver mais</Link> */}
        </ServiceCard>
      </ServicesSection>

      {/* Add other sections like Call to Volunteer, ODS highlight, etc. */}

    </MainLayout>
  );
};

export default HomePage;

