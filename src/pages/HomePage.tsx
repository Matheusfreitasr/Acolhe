import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
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
  color: white;
  min-height: 400px;
  display: flex;
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

  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
    h1 { font-size: 2.5rem; }
    p { font-size: 1.1rem; }
  }

  @media (max-width: 576px) {
    padding: 4rem 1rem;
    min-height: 350px;
    h1 { font-size: 2rem; }
    p { font-size: 1rem; }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const ServiceCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
  
  .card-img-top {
    width: 70px;
    height: 70px;
    margin: 1.5rem auto 1rem;
    object-fit: contain;
  }
  
  .card-title {
    color: var(--primary);
    font-weight: 600;
  }
  
  .card-text {
    color: #666;
  }
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <HeroSection>
        <h1>Bem-vindo(a) à Acolhe+!</h1>
        <p>Conectando você a uma rede de apoio voluntário, informações e oportunidades com respeito e diversidade.</p>
        <ButtonContainer>
          <button className="btn-primary" onClick={() => navigate('/atendimentos')}>
            Buscar Ajuda
          </button>
          <button className="btn-secondary" onClick={() => navigate('/voluntariado')}>
            Quero Ser Voluntário(a)
          </button>
        </ButtonContainer>
      </HeroSection>

      <Container className="py-5">
        <Row className="g-4">
          <Col xs={12} md={6} lg={3}>
            <ServiceCard className="text-center p-3">
              <Card.Img variant="top" src={iconAtendimentos} alt="Ícone Atendimentos" />
              <Card.Body>
                <Card.Title>Atendimentos</Card.Title>
                <Card.Text>
                  Apoio jurídico, psicológico e social com profissionais voluntários.
                </Card.Text>
              </Card.Body>
            </ServiceCard>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <ServiceCard className="text-center p-3">
              <Card.Img variant="top" src={iconVagas} alt="Ícone Vagas de Emprego" />
              <Card.Body>
                <Card.Title>Vagas de Emprego</Card.Title>
                <Card.Text>
                  Oportunidades em empresas que valorizam a diversidade e inclusão.
                </Card.Text>
              </Card.Body>
            </ServiceCard>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <ServiceCard className="text-center p-3">
              <Card.Img variant="top" src={iconProgramacao} alt="Ícone Programação" />
              <Card.Body>
                <Card.Title>Programação</Card.Title>
                <Card.Text>
                  Participe de eventos, palestras e workshops online e presenciais.
                </Card.Text>
              </Card.Body>
            </ServiceCard>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <ServiceCard className="text-center p-3">
              <Card.Img variant="top" src={iconLocaisApoio} alt="Ícone Locais de Apoio" />
              <Card.Body>
                <Card.Title>Locais de Apoio</Card.Title>
                <Card.Text>
                  Encontre casas de acolhida e outras instituições parceiras perto de você.
                </Card.Text>
              </Card.Body>
            </ServiceCard>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default HomePage;
