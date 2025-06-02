import React from 'react';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

const EventCard = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background-color: #fff; 
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.primary};
  }

  p {
    margin-bottom: 0.25rem;
    color: ${props => props.theme.colors.textLight};
  }

  button {
    margin-top: 1rem;
    background-color: ${props => props.theme.colors.primary};
    &:hover {
        background-color: #A052E8; 
    }
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
  ];

  return (
    <MainLayout>
      <h1>Programação do Mês</h1>
      <p>Confira nossos próximos eventos, palestras e workshops online.</p>
      
      {/* Add filters later (e.g., by type, date) */}

      <div>
        {events.map(event => (
          <EventCard key={event.id}>
            <h3>{event.title}</h3>
            <p><strong>Data:</strong> {event.date}</p>
            <p><strong>Horário:</strong> {event.time}</p>
            <p>{event.description}</p>
            <button>Inscrever-se / Mais Informações</button>
          </EventCard>
        ))}
      </div>
    </MainLayout>
  );
};

export default ProgramacaoPage;

