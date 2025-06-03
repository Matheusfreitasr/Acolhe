import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

const PageContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 3rem;
`;

const PageTitle = styled.h1`
  color: #8A2BE2;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
`;

const PageDescription = styled.p`
  color: #8A2BE2;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const FormCard = styled(Card)`
  color: #8A2BE2;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    color: #8A2BE2;
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
    font-weight: 600;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f0f0;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #8A2BE2 ;
  border: none;
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #A052E8;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const InfoCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #A052E8;
  color: #FFFFFF;
  height: 40%;
  
  .card-header {
    background: transparent;
    border-bottom: 1px solid rgba(238, 229, 240, 0.72);
    font-weight: 700;
    font-size: 1.2rem;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  ul {
    padding-left: 1.2rem;
    
    li {
      margin-bottom: 0.8rem;
    }
  }
`;

const VoluntariadoPage: React.FC = () => {
  return (
    <MainLayout>
      <PageContainer>
        <PageTitle>Seja Voluntário(a)</PageTitle>
        <PageDescription>
          Faça parte da nossa rede de apoio e ajude a transformar vidas na comunidade LGBTQIAPN+.
        </PageDescription>
        
        <Row>
          <Col lg={8}>
            <FormCard>
              <Card.Body className="p-4">
                <Form>
                  <FormSection>
                    <h3>Dados Pessoais</h3>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nome Completo</Form.Label>
                          <Form.Control type="text" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>E-mail</Form.Label>
                          <Form.Control type="email" required />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Telefone</Form.Label>
                          <Form.Control type="tel" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Data de Nascimento</Form.Label>
                          <Form.Control type="date" required />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Cidade</Form.Label>
                          <Form.Control type="text" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Estado</Form.Label>
                          <Form.Select required>
                            <option value="">Selecione...</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </FormSection>
                  
                  <FormSection>
                    <h3>Área de Atuação</h3>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Área Principal</Form.Label>
                          <Form.Select required>
                            <option value="">Selecione...</option>
                            <option value="saude_mental">Saúde Mental (Psicologia, Psiquiatria)</option>
                            <option value="juridico">Jurídico (Advocacia)</option>
                            <option value="assistencia_social">Assistência Social</option>
                            <option value="saude_geral">Saúde Geral (Medicina, Enfermagem)</option>
                            <option value="educacao">Educação</option>
                            <option value="comunicacao">Comunicação</option>
                            <option value="tecnologia">Tecnologia</option>
                            <option value="artes">Artes e Cultura</option>
                            <option value="outra">Outra</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Formação/Especialidade</Form.Label>
                          <Form.Control type="text" placeholder="Ex: Psicólogo Clínico, Advogado Cível" required />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Registro Profissional (se aplicável)</Form.Label>
                          <Form.Control type="text" placeholder="Ex: CRP, OAB, CRM" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Experiência com a comunidade LGBTQIAPN+</Form.Label>
                          <Form.Select required>
                            <option value="">Selecione...</option>
                            <option value="nenhuma">Nenhuma experiência prévia</option>
                            <option value="pouca">Pouca experiência</option>
                            <option value="moderada">Experiência moderada</option>
                            <option value="ampla">Ampla experiência</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </FormSection>
                  
                  <FormSection>
                    <h3>Disponibilidade</h3>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Horas disponíveis por semana</Form.Label>
                          <Form.Select required>
                            <option value="">Selecione...</option>
                            <option value="1-2">1-2 horas</option>
                            <option value="3-5">3-5 horas</option>
                            <option value="6-10">6-10 horas</option>
                            <option value="10+">Mais de 10 horas</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Preferência de atuação</Form.Label>
                          <Form.Select required>
                            <option value="">Selecione...</option>
                            <option value="presencial">Presencial</option>
                            <option value="remoto">Remoto</option>
                            <option value="hibrido">Híbrido</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Dias disponíveis</Form.Label>
                      <div className="d-flex flex-wrap gap-3">
                        <Form.Check 
                          type="checkbox"
                          id="segunda"
                          label="Segunda-feira"
                        />
                        <Form.Check 
                          type="checkbox"
                          id="terca"
                          label="Terça-feira"
                        />
                        <Form.Check 
                          type="checkbox"
                          id="quarta"
                          label="Quarta-feira"
                        />
                        <Form.Check 
                          type="checkbox"
                          id="quinta"
                          label="Quinta-feira"
                        />
                        <Form.Check 
                          type="checkbox"
                          id="sexta"
                          label="Sexta-feira"
                        />
                        <Form.Check 
                          type="checkbox"
                          id="sabado"
                          label="Sábado"
                        />
                        <Form.Check 
                          type="checkbox"
                          id="domingo"
                          label="Domingo"
                        />
                      </div>
                    </Form.Group>
                  </FormSection>
                  
                  <FormSection>
                    <h3>Motivação</h3>
                    <Form.Group className="mb-3">
                      <Form.Label>Por que você deseja ser voluntário(a) na Acolhe+?</Form.Label>
                      <Form.Control as="textarea" rows={4} required />
                    </Form.Group>
                  </FormSection>
                  
                  <div className="text-center mt-4">
                    <SubmitButton type="submit">Enviar Cadastro</SubmitButton>
                  </div>
                </Form>
              </Card.Body>
            </FormCard>
          </Col>
          
          <Col lg={4}>
            <InfoCard>
              <Card.Header>Por que ser voluntário(a)?</Card.Header>
              <Card.Body>
                <p>Ao se tornar voluntário(a) na Acolhe+, você:</p>
                <ul>
                  <li>Contribui diretamente para o bem-estar da comunidade LGBTQIAPN+</li>
                  <li>Participa de uma rede de apoio nacional</li>
                  <li>Recebe capacitação específica para atendimento</li>
                  <li>Troca experiências com outros profissionais</li>
                  <li>Ajuda a construir uma sociedade mais inclusiva</li>
                </ul>
                <p className="mt-3">Após o envio do formulário, nossa equipe entrará em contato para agendar uma entrevista online.</p>
              </Card.Body>
            </InfoCard>
            
            <InfoCard className="mt-4">
              <Card.Header>Áreas de atuação</Card.Header>
              <Card.Body>
                <ul>
                  <li>Atendimento psicológico</li>
                  <li>Orientação jurídica</li>
                  <li>Assistência social</li>
                  <li>Saúde e bem-estar</li>
                  <li>Educação e capacitação</li>
                  <li>Comunicação e design</li>
                  <li>Tecnologia e desenvolvimento</li>
                </ul>
              </Card.Body>
            </InfoCard>
          </Col>
        </Row>
      </PageContainer>
    </MainLayout>
  );
};

export default VoluntariadoPage;
