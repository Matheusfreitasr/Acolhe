import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

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
  color: #750787;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const JobCard = styled(Card)`
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

  .card-header {
    background-color: white;
    border-bottom: 1px solid #f0f0f0;
    padding: 1.25rem 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
    color: #750787;
  }

  .company-name {
    color: #750787;
    font-size: 0.95rem;
  }

  .badge {
    font-weight: 500;
    padding: 0.4rem 0.8rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const FilterSection = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;

  h4, h5 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #750787;
    font-weight: 600;
  }

  .form-check {
    color: #750787;
    margin-bottom: 0.5rem;
  }
`;

const VagasPage: React.FC = () => {
  const allJobs = [
    {
      id: 1,
      title: 'Analista de Recursos Humanos',
      company: 'TechDiversa',
      location: 'São Paulo, SP',
      type: 'Tempo Integral',
      remote: true,
      tags: ['RH', 'Diversidade', 'Inclusão'],
      description: 'Buscamos profissional para atuar na área de RH com foco em políticas de diversidade e inclusão.',
      date: '01/06/2025'
    },
    {
      id: 2,
      title: 'Desenvolvedor(a) Front-end',
      company: 'Arco-Íris Tech',
      location: 'Remoto',
      type: 'Tempo Integral',
      remote: true,
      tags: ['React', 'JavaScript', 'UI/UX'],
      description: 'Empresa de tecnologia com foco na comunidade LGBTQIAPN+ busca desenvolvedor(a) front-end.',
      date: '29/05/2025'
    },
    {
      id: 3,
      title: 'Assistente Social',
      company: 'Instituto Acolher',
      location: 'Rio de Janeiro, RJ',
      type: 'Meio Período',
      remote: false,
      tags: ['Assistência Social', 'Comunidade'],
      description: 'ONG busca assistente social para população LGBTQIAPN+ em vulnerabilidade.',
      date: '28/05/2025'
    },
    {
      id: 4,
      title: 'Psicólogo(a) Clínico(a)',
      company: 'Clínica DiverSaúde',
      location: 'Belo Horizonte, MG',
      type: 'Autônomo',
      remote: true,
      tags: ['Psicologia', 'Atendimento Online'],
      description: 'Clínica especializada em LGBTQIAPN+ busca psicólogo(a).',
      date: '25/05/2025'
    },
    {
      id: 5,
      title: 'Coordenador(a) de Projetos',
      company: 'Fundação Arco-Íris',
      location: 'Brasília, DF',
      type: 'Tempo Integral',
      remote: false,
      tags: ['Gestão de Projetos', 'Terceiro Setor'],
      description: 'Fundação busca coordenador(a) para projetos sociais LGBTQIAPN+.',
      date: '22/05/2025'
    }
  ];

  const [jobs, setJobs] = useState(allJobs);
  const [filters, setFilters] = useState({
    contractTypes: new Set<string>(),
    modalities: new Set<string>(),
    location: ''
  });

  useEffect(() => {
    const filtered = allJobs.filter(job => {
      const typeMatch = filters.contractTypes.size === 0 || filters.contractTypes.has(job.type);
      const remoteMatch =
        filters.modalities.size === 0 ||
        (filters.modalities.has('Remoto') && job.remote) ||
        (filters.modalities.has('Presencial') && !job.remote);
      const locationMatch =
        filters.location === '' ||
        job.location.includes(filters.location);

      return typeMatch && remoteMatch && locationMatch;
    });

    setJobs(filtered);
  }, [filters]);

  const toggleFilter = (category: 'contractTypes' | 'modalities', value: string) => {
    setFilters(prev => {
      const updated = new Set(prev[category]);
      updated.has(value) ? updated.delete(value) : updated.add(value);
      return { ...prev, [category]: updated };
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, location: e.target.value }));
  };

  return (
    <MainLayout>
      <PageContainer>
        <PageTitle>Vagas de Emprego</PageTitle>
        <PageDescription>
          Encontre oportunidades em empresas e organizações que valorizam a diversidade e inclusão.
        </PageDescription>

        <Row>
          <Col lg={3}>
            <FilterSection>
              <h4>Filtros</h4>

              <div className="mb-4">
                <h5>Tipo de Contrato</h5>
                {['Tempo Integral', 'Meio Período', 'Autônomo', 'Estágio'].map(type => (
                  <div className="form-check" key={type}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={type}
                      checked={filters.contractTypes.has(type)}
                      onChange={() => toggleFilter('contractTypes', type)}
                    />
                    <label className="form-check-label" htmlFor={type}>
                      {type}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h5>Modalidade</h5>
                {['Remoto', 'Presencial'].map(mode => (
                  <div className="form-check" key={mode}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={mode}
                      checked={filters.modalities.has(mode)}
                      onChange={() => toggleFilter('modalities', mode)}
                    />
                    <label className="form-check-label" htmlFor={mode}>
                      {mode}
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <h5>Localização</h5>
                <select className="form-select" onChange={handleLocationChange}>
                  <option value="">Todos os estados</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="DF">Distrito Federal</option>
                </select>
              </div>
            </FilterSection>
          </Col>

          <Col lg={9}>
            {jobs.length > 0 ? (
              jobs.map(job => (
                <JobCard key={job.id}>
                  <Card.Header>
                    <Card.Title>{job.title}</Card.Title>
                    <div className="company-name">{job.company} • {job.location}</div>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <Badge bg="primary">{job.type}</Badge>
                      {job.remote && <Badge bg="info">Remoto</Badge>}
                      {job.tags.map((tag, idx) => (
                        <Badge bg="secondary" key={idx}>{tag}</Badge>
                      ))}
                    </div>
                    <Card.Text>{job.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <small className="text-muted">Publicada em: {job.date}</small>
                      <button className="btn btn-outline-primary">Ver Detalhes</button>
                    </div>
                  </Card.Body>
                </JobCard>
              ))
            ) : (
              <p>Nenhuma vaga encontrada com os filtros selecionados.</p>
            )}
          </Col>
        </Row>
      </PageContainer>
    </MainLayout>
  );
};

export default VagasPage;
