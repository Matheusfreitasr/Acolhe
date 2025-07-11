import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

const ContentSection = styled.section`
  padding: 4rem 2rem;
  min-height: 80vh;
  background: ${props => props.theme.colors.background};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.primaryHover};
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  font-size: 1rem;
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const LastUpdated = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-style: italic;
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
`;

const TermosUsoPage: React.FC = () => {
  return (
    <MainLayout>
      <ContentSection>
        <Container>
          <Row>
            <Col xs={12} lg={10} className="mx-auto">
              <Title>Termos de Uso</Title>
              
              <Content>
                <p>
                  Bem-vindx à Acolhe+! Estes Termos de Uso estabelecem as condições para utilização da nossa plataforma de conexão entre profissionais LGBTQIAPN+ e empresas que valorizam a diversidade e inclusão.
                </p>

                <Subtitle>1. Aceitação dos Termos</Subtitle>
                <p>
                  Ao acessar e utilizar a plataforma Acolhe+, você concorda em cumprir estes Termos de Uso e nossa Política de Privacidade. Se você não concorda com algum destes termos, não deve utilizar nossos serviços.
                </p>

                <Subtitle>2. Descrição dos Serviços</Subtitle>
                <p>A Acolhe+ oferece:</p>
                <ul>
                  <li>Plataforma de busca e candidatura a vagas de emprego</li>
                  <li>Conexão entre profissionais LGBTQIAPN+ e empresas inclusivas</li>
                  <li>Recursos de perfil profissional personalizado</li>
                  <li>Informações sobre oportunidades de carreira</li>
                  <li>Suporte e orientação para desenvolvimento profissional</li>
                </ul>

                <Subtitle>3. Cadastro e Conta do Usuário</Subtitle>
                <p>Para utilizar nossos serviços, você deve:</p>
                <ul>
                  <li>Fornecer informações verdadeiras, precisas e atualizadas</li>
                  <li>Manter a confidencialidade de sua senha</li>
                  <li>Ser responsável por todas as atividades em sua conta</li>
                  <li>Notificar-nos imediatamente sobre uso não autorizado</li>
                  <li>Ter pelo menos 16 anos de idade</li>
                </ul>

                <Subtitle>4. Uso Aceitável</Subtitle>
                <p>Você concorda em NÃO:</p>
                <ul>
                  <li>Usar a plataforma para fins ilegais ou não autorizados</li>
                  <li>Publicar conteúdo ofensivo, discriminatório ou inadequado</li>
                  <li>Interferir no funcionamento da plataforma</li>
                  <li>Tentar acessar contas de outros usuários</li>
                  <li>Usar informações de outros usuários para fins não relacionados à plataforma</li>
                  <li>Criar múltiplas contas ou contas falsas</li>
                </ul>

                <Subtitle>5. Conteúdo do Usuário</Subtitle>
                <p>
                  Você é responsável pelo conteúdo que publica na plataforma, incluindo informações do perfil, currículos e mensagens. Ao publicar conteúdo, você garante que:
                </p>
                <ul>
                  <li>Possui todos os direitos necessários sobre o conteúdo</li>
                  <li>O conteúdo não viola direitos de terceiros</li>
                  <li>O conteúdo é preciso e não enganoso</li>
                  <li>O conteúdo não contém vírus ou códigos maliciosos</li>
                </ul>

                <Subtitle>6. Propriedade Intelectual</Subtitle>
                <p>
                  A plataforma Acolhe+, incluindo seu design, funcionalidades, textos, gráficos e código, é propriedade da Acolhe+ e está protegida por leis de propriedade intelectual. Você não pode copiar, modificar ou distribuir nosso conteúdo sem autorização.
                </p>

                <Subtitle>7. Privacidade e Proteção de Dados</Subtitle>
                <p>
                  Respeitamos sua privacidade e nos comprometemos a proteger seus dados pessoais conforme descrito em nossa Política de Privacidade. Informações sobre identidade de gênero e orientação sexual são tratadas com especial cuidado e confidencialidade.
                </p>

                <Subtitle>8. Limitação de Responsabilidade</Subtitle>
                <p>
                  A Acolhe+ não se responsabiliza por:
                </p>
                <ul>
                  <li>Decisões de contratação das empresas parceiras</li>
                  <li>Conteúdo publicado por outros usuários</li>
                  <li>Interrupções temporárias do serviço</li>
                  <li>Perdas ou danos indiretos</li>
                  <li>Ações de terceiros</li>
                </ul>

                <Subtitle>9. Modificações dos Termos</Subtitle>
                <p>
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Mudanças significativas serão comunicadas através da plataforma ou por e-mail. O uso continuado após as modificações constitui aceitação dos novos termos.
                </p>

                <Subtitle>10. Suspensão e Encerramento</Subtitle>
                <p>
                  Podemos suspender ou encerrar sua conta se você violar estes Termos de Uso. Você pode encerrar sua conta a qualquer momento através das configurações da plataforma ou entrando em contato conosco.
                </p>

                <Subtitle>11. Lei Aplicável</Subtitle>
                <p>
                  Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
                </p>

                <Subtitle>12. Contato</Subtitle>
                <p>
                  Para dúvidas sobre estes Termos de Uso, entre em contato:
                </p>
                <ul>
                  <li>E-mail: suporte@acolhemais.com.br</li>
                  <li>Telefone: (xx) 0000-0000</li>
                  <li>Endereço: [Endereço da empresa]</li>
                </ul>

                <LastUpdated>
                  Última atualização: Janeiro de 2025
                </LastUpdated>
              </Content>
            </Col>
          </Row>
        </Container>
      </ContentSection>
    </MainLayout>
  );
};

export default TermosUsoPage;
