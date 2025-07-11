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

const PoliticaPrivacidadePage: React.FC = () => {
  return (
    <MainLayout>
      <ContentSection>
        <Container>
          <Row>
            <Col xs={12} lg={10} className="mx-auto">
              <Title>Política de Privacidade</Title>
              
              <Content>
                <p>
                  A Acolhe+ está comprometida em proteger a privacidade e os dados pessoais de todos os usuários da nossa plataforma. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.
                </p>

                <Subtitle>1. Informações que Coletamos</Subtitle>
                <p>Coletamos as seguintes informações quando você utiliza nossa plataforma:</p>
                <ul>
                  <li><strong>Dados de Cadastro:</strong> Nome completo, e-mail, telefone, data de nascimento, cidade, estado</li>
                  <li><strong>Informações de Perfil:</strong> Identidade de gênero, orientação sexual, profissão, nível de experiência</li>
                  <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência</li>
                  <li><strong>Informações de Uso:</strong> Interações com vagas, candidaturas, preferências</li>
                </ul>

                <Subtitle>2. Como Utilizamos suas Informações</Subtitle>
                <p>Utilizamos suas informações para:</p>
                <ul>
                  <li>Fornecer e melhorar nossos serviços de conexão com oportunidades de emprego</li>
                  <li>Personalizar sua experiência na plataforma</li>
                  <li>Conectar você com empresas que valorizam a diversidade</li>
                  <li>Enviar comunicações relevantes sobre vagas e oportunidades</li>
                  <li>Garantir a segurança e integridade da plataforma</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                </ul>

                <Subtitle>3. Compartilhamento de Informações</Subtitle>
                <p>
                  Respeitamos sua privacidade e não vendemos suas informações pessoais. Podemos compartilhar seus dados apenas nas seguintes situações:
                </p>
                <ul>
                  <li>Com empresas parceiras, quando você se candidata a uma vaga (apenas informações relevantes para o processo seletivo)</li>
                  <li>Com prestadores de serviços que nos auxiliam na operação da plataforma</li>
                  <li>Quando exigido por lei ou ordem judicial</li>
                  <li>Para proteger nossos direitos, propriedade ou segurança</li>
                </ul>

                <Subtitle>4. Proteção de Dados</Subtitle>
                <p>
                  Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição, incluindo:
                </p>
                <ul>
                  <li>Criptografia de dados sensíveis</li>
                  <li>Controles de acesso rigorosos</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Treinamento regular da equipe sobre proteção de dados</li>
                </ul>

                <Subtitle>5. Seus Direitos</Subtitle>
                <p>Você tem os seguintes direitos em relação aos seus dados pessoais:</p>
                <ul>
                  <li><strong>Acesso:</strong> Solicitar uma cópia dos dados que temos sobre você</li>
                  <li><strong>Retificação:</strong> Corrigir informações incorretas ou incompletas</li>
                  <li><strong>Exclusão:</strong> Solicitar a remoção de seus dados pessoais</li>
                  <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                  <li><strong>Oposição:</strong> Opor-se ao processamento de seus dados para determinadas finalidades</li>
                </ul>

                <Subtitle>6. Cookies e Tecnologias Similares</Subtitle>
                <p>
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
                </p>

                <Subtitle>7. Retenção de Dados</Subtitle>
                <p>
                  Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, exceto quando a retenção por período mais longo for exigida ou permitida por lei.
                </p>

                <Subtitle>8. Alterações nesta Política</Subtitle>
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através da plataforma ou por e-mail.
                </p>

                <Subtitle>9. Contato</Subtitle>
                <p>
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco:
                </p>
                <ul>
                  <li>E-mail: privacidade@acolhemais.com.br</li>
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

export default PoliticaPrivacidadePage;
