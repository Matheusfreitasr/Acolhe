import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: ${props => props.theme.gradients.primaryDiagonal};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
`;

const NavBrand = styled(Link)`
  font-size: 1.7rem;
  font-weight: bold;
  color: ${props => props.theme.colors.progressWhite};
  text-decoration: none;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);

  &:hover {
      opacity: 0.9;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.8rem; 

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 1rem;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.progressWhite};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500; 
  padding: 0.3rem 0;
  position: relative;
  transition: color 0.2s ease-in-out;

  &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: ${props => props.theme.colors.secondary};
      transition: width 0.3s ease-in-out;
  }

  &:hover {
    color: ${props => props.theme.colors.secondary};
    &::after {
        width: 100%;
    }
  }
`;

const Navbar: React.FC = () => {
  return (
    <Nav>
      <NavBrand to="/">Plataforma LGBTQIAPN+</NavBrand>
      <NavLinks>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/atendimentos">Atendimentos</NavLink>
        <NavLink to="/vagas">Vagas</NavLink>
        <NavLink to="/programacao">Programação</NavLink>
        <NavLink to="/locais-referencia">Locais de Apoio</NavLink>
        <NavLink to="/seja-voluntario">Seja Voluntário</NavLink>
        <NavLink to="/login">Login</NavLink>
        {/* Add more links as needed */}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

