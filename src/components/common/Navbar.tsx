import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';
import styled from 'styled-components';
import logoImage from '../../assets/logo/acolhe+_logo.png';

const StyledNavbar = styled(BootstrapNavbar)`
  background: ${props => props.theme.gradients.primaryDiagonal};
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  padding: 0.25rem;
  width: 100%;
`;

const Logo = styled.img`
  height: 90px;
  margin-right: 10px;
  border-radius: 50px;
  @media (max-width: 576px) {
    height: 35px;
  }
`;

const NavLink = styled(Nav.Link)`
  color: white !important;
  font-weight: 500;
  position: relative;
  margin: 0 0.5rem;
  padding: 0.5rem 0.75rem !important;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${props => props.theme.colors.progressViolet};
    transition: width 0.3s ease-in-out;
  }

  &:hover, &.active {
    color: ${props => props.theme.colors.progressViolet} !important;
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: 992px) {
    margin: 0.25rem 0;
    text-align: center;
  }
`;

const LoginButton = styled(Button)`
  background-color: ${props => props.theme.colors.progressWhite};
  text-align: center;
  border: none;
  border-radius: 50px;
  padding: 0.4rem 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #750787;
    color: ${props => props.theme.colors.progressWhite};
    transform: translateY(-2px);
  }
  
  @media (max-width: 992px) {
    margin-top: 0.5rem;
    text-align: center;
    width: 100%;
    max-width: 100px;
  }
`;

const NavbarToggle = styled(BootstrapNavbar.Toggle)`
  border: none;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  &:focus {
    box-shadow: none;
  }
`;

const Navbar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledNavbar expand="lg" variant="dark" expanded={expanded}>
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Logo src={logoImage} alt="Acolhe+ Logo" />
        </BootstrapNavbar.Brand>
        
        <NavbarToggle 
          aria-controls="responsive-navbar-nav" 
          onClick={() => setExpanded(expanded ? false : true)}
        />
        
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavLink as={Link} to="/" onClick={() => setExpanded(false)}>Início</NavLink>
            <NavLink as={Link} to="/atendimentos" onClick={() => setExpanded(false)}>Atendimentos</NavLink>
            <NavLink as={Link} to="/vagas" onClick={() => setExpanded(false)}>Vagas</NavLink>
            <NavLink as={Link} to="/programacao" onClick={() => setExpanded(false)}>Programação</NavLink>
            <NavLink as={Link} to="/locais-referencia" onClick={() => setExpanded(false)}>Locais de Apoio</NavLink>
            <NavLink as={Link} to="/seja-voluntario" onClick={() => setExpanded(false)}>Seja Voluntário</NavLink>
            <LoginButton as={Link} to="/login" onClick={() => setExpanded(false)}>Login</LoginButton>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
