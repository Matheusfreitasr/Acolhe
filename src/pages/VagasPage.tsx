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

// Container for the job cards - using Grid for responsiveness
const JobsGrid = styled.div`
  display: grid;
  // Adjust minmax for desired card size and responsiveness
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr; // Ensure single column on mobile
    gap: 1rem;
  }
`;

// Styled Job Card
const JobCard = styled.div`
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

  // Container for tags
  .tags-container {
      margin-top: 0.8rem; // Add space above tags
      margin-bottom: 1rem; // Add space below tags
      flex-wrap: wrap; // Allow tags to wrap
      display: flex;
      gap: 0.5rem;
  }

  span {
    display: inline-block;
    background-color: ${props => props.theme.colors.lightGray}; // Use a lighter background for tags
    color: ${props => props.theme.colors.textLight};
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-size: 0.8rem;
    // Removed margin-right and margin-top, handled by gap
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
      span { font-size: 0.75rem; padding: 0.25rem 0.5rem; }
      button { width: 100%; text-align: center; } // Make button full width on mobile
  }
`;

const VagasPage: React.FC = () => {
  // Placeholder data - replace with API call later
  const jobs = [
    {
      id: 1,
      title: 'Desenvolvedor(a) Front-End Jr (React)',
      company: 'Empresa Inclusiva Ltda.',
      location: 'Remoto',
      description: 'Oportunidade para trabalhar em projetos inovadores com foco em acessibilidade.',
      tags: ['React', 'TypeScript', 'Acessibilidade'],
    },
    {
      id: 2,
      title: 'Analista de Marketing Digital Pleno',
      company: 'Startup Diversidade S.A.',
      location: 'São Paulo, SP',
      description: 'Buscamos profissional criativo(a) para gerenciar campanhas e mídias sociais.',
      tags: ['Marketing Digital', 'SEO', 'Mídias Sociais'],
    },
    {
      id: 3,
      title: 'Assistente Administrativo Afirmativa LGBTQIAPN+',
      company: 'ONG Acolher Mais',
      location: 'Rio de Janeiro, RJ',
      description: 'Vaga afirmativa para apoiar as atividades administrativas da organização.',
      tags: ['Administrativo', 'ONG', 'Vaga Afirmativa'],
    }
    // Add more job examples if needed
  ];

  return (
    <MainLayout>
      <PageContainer>
        <h1>Vagas de Emprego</h1>
        <p>Encontre oportunidades em empresas comprometidas com a diversidade e inclusão.</p>

        {/* Add search bar and filters later (location, area, type) */}

        <JobsGrid>
          {jobs.map(job => (
            <JobCard key={job.id}>
              <h3>{job.title}</h3>
              <p><strong>Empresa:</strong> {job.company}</p>
              <p><strong>Localidade:</strong> {job.location}</p>
              <p>{job.description}</p>
              <div className="tags-container">
                {job.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>
              <button>Ver Detalhes / Candidatar-se</button>
            </JobCard>
          ))}
        </JobsGrid>
      </PageContainer>
    </MainLayout>
  );
};

export default VagasPage;

