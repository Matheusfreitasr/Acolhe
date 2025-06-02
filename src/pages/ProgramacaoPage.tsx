import React from 'react';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

// Container for the page content
const PageContainer = styled.div`
  padding: 2rem; // Add padding around the page content
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.primary};
  }

  > p { // Target the main description paragraph
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.textLight};
    font-size: 1.1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1.5rem;
    h1 { font-size: 1.8rem; }
    > p { font-size: 1rem; margin-bottom: 1.5rem; }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
    h1 { font-size: 1.6rem; }
    > p { font-size: 0.95rem; margin-bottom: 1rem; }
  }
`;

// Container for the event cards - using Grid for responsiveness
const EventsGrid = styled.div`
  display: grid;
  // Adjust minmax for desired card size and responsiveness
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr; // Ensure single column on mobile
    gap: 1rem;
  }
`;

// Styled Event Card
const EventCard = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  // Removed margin-bottom, handled by grid gap
  border-radius: 8px;
  background-color: ${props => props.theme.colors.progressWhite};
  box-shadow: ${props => props.theme.shadows.card};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column; // Stack content vertically

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
    color: ${props => props.theme.colors.primary};
  }

  p {
    margin-bottom: 0.3rem;
    color: ${props => props.theme.colors.textLight};
    font-size: 0.95rem;
    line-height: 1.5;
  }

  p strong {
      color: ${props => props.theme.colors.text}; // Make labels slightly darker
  }

  button {
    margin-top: auto; // Push button to the bottom of the card
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.progressWhite};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    align-self: flex-start; // Align button to the start

    &:hover {
        background-color: ${props => props.theme.colors.primaryHover};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: 1rem;
      h3 { font-size: 1.1rem; }
      p { font-size: 0.9rem; }
      button { width: 100%; text-align: center; } // Make button full width on mobile
  }
`;

const ProgramacaoPage: React.FC = () => {
  // Placeholder data - replace with API call later
  const events = [
    {
      id: 1,
      title: 'Oficina de Escrita Criativa',
      date: '10/06/2025', // Example date
      time: '19:00',
      description: 'Explore sua criatividade e expressão através da escrita.',
    },
    {
      id: 2,
      title: 'Roda de Conversa: Empregabilidade Trans',
      date: '15/06/2025',
      time: '18:30',
      description: 'Discussão sobre desafios e oportunidades no mercado de trabalho.',
    },
    {
        id: 3,
        title: 'Mesa de Bate Papo LGBTQIAPN+',
        date: '22/06/2025',
        time: '20:00',
        description: 'Um espaço seguro para compartilhar experiências e conectar-se.',
    }
    // Add more event examples if needed
  ];

  return (
    <MainLayout>
      <PageContainer>
        <h1>Programação do Mês</h1>
        <p>Confira nossos próximos eventos, palestras e workshops online.</p>
        
        {/* Add filters later (e.g., by type, date) */}

        <EventsGrid>
          {events.map(event => (
            <EventCard key={event.id}>
              <h3>{event.title}</h3>
              <p><strong>Data:</strong> {event.date}</p>
              <p><strong>Horário:</strong> {event.time}</p>
              <p>{event.description}</p>
              <button>Inscrever-se / Mais Informações</button>
            </EventCard>
          ))}
        </EventsGrid>
      </PageContainer>
    </MainLayout>
  );
};

export default ProgramacaoPage;

