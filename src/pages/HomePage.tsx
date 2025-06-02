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
  min-height: 400px; // Keep a minimum height
  display: flex; // Use flexbox for centering content vertically
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

  // Button container for better control on mobile
  div {
      display: flex;
      flex-wrap: wrap; // Allow buttons to wrap on small screens
      justify-content: center;
      gap: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) { // Adjust breakpoint if needed
      padding: 5rem 1.5rem;
      h1 { font-size: 2.5rem; }
      p { font-size: 1.1rem; }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: 4rem 1rem;
      min-height: 350px; // Slightly reduce min-height on mobile
      h1 { font-size: 2rem; } // Further reduce font size
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
  // Removed margin: 0.5rem; handled by gap in parent div
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.3);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: 1rem; // Slightly smaller font on mobile
      padding: 0.7rem 1.5rem; // Adjust padding
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
  background-color: ${props => props.theme.colors.lightGray}; // Use lightGray for subtle contrast
  display: grid;
  // Use auto-fit for responsiveness, adjust minmax as needed
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 2rem; // Slightly reduced gap
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      padding: 3rem 1.5rem;
      gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: 2rem 1rem;
      // Ensure single column on mobile by adjusting minmax or explicitly setting columns
      grid-template-columns: 1fr; // Force single column on mobile
      gap: 1.5rem;
  }
`;

const ServiceCard = styled.div`
  background-color: ${props => props.theme.colors.progressWhite};
  padding: 2rem 1.5rem; // Adjust padding
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.card}; 
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex; // Use flexbox for better alignment
  flex-direction: column;
  align-items: center;

  &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  img {
      max-width: 70px; // Slightly smaller icon
      height: 70px;
      margin-bottom: 1.2rem; // Adjust margin
      object-fit: contain;
  }

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.8rem;
    font-size: 1.3rem; // Adjust font size
  }

  p {
      color: ${props => props.theme.colors.textLight};
      font-size: 0.95rem;
      line-height: 1.6; // Slightly increased line-height
      flex-grow: 1; // Allow paragraph to take available space
      margin-bottom: 1rem; // Add margin below paragraph
  }

  // Example for adding a link/button inside the card
  // a, button {
  //   margin-top: auto; // Push link/button to the bottom
  //   text-decoration: none;
  //   color: ${props => props.theme.colors.primary};
  //   font-weight: 600;
  // }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: 1.5rem 1rem;
      h3 { font-size: 1.2rem; }
      p { font-size: 0.9rem; }
      img { max-width: 60px; height: 60px; }
  }
`;

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection>
        <h1>Bem-vindo(a) à Plataforma de Apoio LGBTQIAPN+!</h1>
        <p>Conectando você a uma rede de apoio voluntário, informações e oportunidades com respeito e diversidade.</p>
        <div>
          {/* Consider linking these buttons to actual pages/actions */}
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

