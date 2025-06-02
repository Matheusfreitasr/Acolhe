import React from 'react';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

// Placeholder for a Card component (similar to EventCard)
const JobCard = styled.div`
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

  span {
    display: inline-block;
    background-color: ${props => props.theme.colors.progressPink};
    color: ${props => props.theme.colors.textLight};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
  }

  button {
    margin-top: 1rem;
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
  ];

  return (
    <MainLayout>
      <h1>Vagas de Emprego</h1>
      <p>Encontre oportunidades em empresas comprometidas com a diversidade e inclusão.</p>

      {/* Add search bar and filters later (location, area, type) */}

      <div>
        {jobs.map(job => (
          <JobCard key={job.id}>
            <h3>{job.title}</h3>
            <p><strong>Empresa:</strong> {job.company}</p>
            <p><strong>Localidade:</strong> {job.location}</p>
            <p>{job.description}</p>
            <div>
              {job.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
            <button>Ver Detalhes / Candidatar-se</button>
          </JobCard>
        ))}
      </div>
    </MainLayout>
  );
};

export default VagasPage;

