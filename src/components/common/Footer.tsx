import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.darkBackground}; 
  color: ${props => props.theme.colors.progressWhite}; 
  padding: 2rem 1rem; 
  text-align: center;
  margin-top: auto; 
  border-top: 3px solid ${props => props.theme.colors.primary}; 
  width: 100%;
  overflow-x: hidden;
`;

const FooterLinks = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  a {
    color: ${props => props.theme.colors.progressWhite}; 
    opacity: 0.8;
    margin: 0.5rem 0.85rem;
    text-decoration: none;
    transition: opacity 0.2s ease-in-out, color 0.2s ease-in-out;
    &:hover {
      opacity: 1;
      color: ${props => props.theme.colors.primaryHover}; 
      text-decoration: none;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    a {
      margin: 0.5rem 0;
    }
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.progressWhite};
  opacity: 0.7;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterLinks>
        <a href="/quem-somos">Quem Somos</a>
        <a href="/contato">Contato</a>
        <a href="/politica-privacidade">Política de Privacidade</a>
        <a href="/termos-uso">Termos de Uso</a>
      </FooterLinks>
      <FooterText>
        © {currentYear} Plataforma de Apoio LGBTQIAPN+. Todos os direitos reservados.
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
