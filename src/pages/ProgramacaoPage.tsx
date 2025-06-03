import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

import logoWorkshop from '../assets/Workshop.jpg';
import logoRodaDeConversa from '../assets/Roda_Conversa.jpg';
import logoPalestra from '../assets/Palestra.jpg';
import logoFeira from '../assets/Feira_empregabilidade.jpg'
import logoCurso from '../assets/Curso.jpg'


const PageContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 3rem;
`;

const PageTitle = styled.h1`
  color: #A052E8;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
`;

const PageDescription = styled.p`
  color: #8A2BE2;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const EventCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1.5rem;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
  
  .card-img-top {
    height: 180px;
    object-fit: cover;
  }
`;

const EventDate = styled.div`
  background: #8A2BE2;
  color: white;
  text-align: center;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  
  .day {
    font-size: 1.8rem;
    line-height: 1;
  }
  
  .month {
    font-size: 1rem;
    text-transform: uppercase;
  }
`;

const EventInfo = styled.div`
  padding: 1rem 0;
  
  .event-time, .event-location {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    color: #A052E8;
    
    svg {
      margin-right: 0.5rem;
      color: #A052E8;
    }
  }
`;

const FilterSection = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  h4 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #A052E8;
    font-weight: 600;
  }
  
  h5 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #A052E8;
    font-weight: 600;
  }
  
`;

const ProgramacaoPage: React.FC = () => {
  // Dados de exemplo para eventos
  const events = [
    {
      id: 1,
      title: 'Workshop: Saúde Mental e Comunidade LGBTQIAPN+',
      image: logoWorkshop,
      date: { day: '15', month: 'Jun' },
      time: '14:00 - 17:00',
      location: 'Online (Zoom)',
      type: 'Workshop',
      description: 'Workshop sobre saúde mental voltado para a comunidade LGBTQIAPN+, com foco em estratégias de autocuidado e bem-estar emocional.'
    },
    {
      id: 2,
      title: 'Palestra: Direitos e Cidadania LGBTQIAPN+',
      image: logoPalestra,
      date: { day: '20', month: 'Jun' },
      time: '19:00 - 21:00',
      location: 'Centro Cultural DiverSer - São Paulo',
      type: 'Palestra',
      description: 'Palestra com advogados especialistas em direitos LGBTQIAPN+, abordando temas como retificação de nome, união estável e adoção.'
    },
    {
      id: 3,
      title: 'Roda de Conversa: Vivências Trans',
      image: logoRodaDeConversa,
      date: { day: '25', month: 'Jun' },
      time: '18:30 - 20:30',
      location: 'Casa Aurora - São Paulo',
      type: 'Roda de Conversa',
      description: 'Espaço de troca de experiências e vivências de pessoas trans e não-binárias, com mediação de psicólogos e assistentes sociais.'
    },
    {
      id: 4,
      title: 'Feira de Empregabilidade LGBTQIAPN+',
      image: logoFeira,
      date: { day: '02', month: 'Jul' },
      time: '10:00 - 18:00',
      location: 'Shopping Center Norte - São Paulo',
      type: 'Feira',
      description: 'Feira de empregabilidade com empresas comprometidas com a diversidade e inclusão, oferecendo vagas e orientação profissional.'
    },
    {
      id: 5,
      title: 'Curso: Empreendedorismo para LGBTQIAPN+',
      image: logoCurso,
      date: { day: '10', month: 'Jul' },
      time: '09:00 - 17:00',
      location: 'Online (Microsoft Teams)',
      type: 'Curso',
      description: 'Curso intensivo de empreendedorismo voltado para pessoas LGBTQIAPN+ que desejam iniciar ou expandir seus negócios.'
    }
  ];

  return (
    <MainLayout>
      <PageContainer>
        <PageTitle>Programação</PageTitle>
        <PageDescription>
          Confira nossa agenda de eventos, palestras e workshops para a comunidade LGBTQIAPN+.
        </PageDescription>
        
        <Row>
          <Col lg={3}>
            <FilterSection>
              <h4>Filtros</h4>
              
              <div className="mb-4">
                <h5 className="h6 mb-2">Tipo de Evento</h5>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="workshop" />
                  <label className="form-check-label" htmlFor="workshop">
                    Workshop
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="palestra" />
                  <label className="form-check-label" htmlFor="palestra">
                    Palestra
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="roda" />
                  <label className="form-check-label" htmlFor="roda">
                    Roda de Conversa
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="feira" />
                  <label className="form-check-label" htmlFor="feira">
                    Feira
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="curso" />
                  <label className="form-check-label" htmlFor="curso">
                    Curso
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="h6 mb-2">Modalidade</h5>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="online" />
                  <label className="form-check-label" htmlFor="online">
                    Online
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="presencial" />
                  <label className="form-check-label" htmlFor="presencial">
                    Presencial
                  </label>
                </div>
              </div>
              
              <div>
                <h5 className="h6 mb-2">Mês</h5>
                <select className="form-select">
                  <option value="junho">Junho 2025</option>
                  <option value="julho">Julho 2025</option>
                  <option value="agosto">Agosto 2025</option>
                  <option value="setembro">Setembro 2025</option>
                </select>
              </div>
            </FilterSection>
          </Col>
          
          <Col lg={9}>
            {events.map(event => (
              <EventCard key={event.id}>
                <Row className="g-0">
                  <Col md={3} className="d-flex align-items-stretch">
                    <Card.Img src={event.image} className="h-100" />
                  </Col>
                  <Col md={9}>
                    <Card.Body>
                      <Row>
                        <Col xs={3} md={2}>
                          <EventDate>
                            <div className="day">{event.date.day}</div>
                            <div className="month">{event.date.month}</div>
                          </EventDate>
                        </Col>
                        <Col xs={9} md={10}>
                          <Card.Title className="mb-2">{event.title}</Card.Title>
                          <EventInfo>
                            <div className="event-time">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                              </svg>
                              {event.time}
                            </div>
                            <div className="event-location">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                              </svg>
                              {event.location}
                            </div>
                          </EventInfo>
                          <Card.Text>{event.description}</Card.Text>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <span className="badge bg-primary">{event.type}</span>
                            <button className="btn btn-outline-primary">Inscrever-se</button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                </Row>
              </EventCard>
            ))}
          </Col>
        </Row>
      </PageContainer>
    </MainLayout>
  );
};

export default ProgramacaoPage;
