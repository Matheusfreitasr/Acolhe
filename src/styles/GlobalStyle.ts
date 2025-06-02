import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.main};
    line-height: 1.6;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
  }

  #root {
      flex: 1;
      display: flex;
      flex-direction: column;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${props => props.theme.colors.primaryHover};
      text-decoration: none; 
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem; 
    font-weight: 700; 
    line-height: 1.3;
    color: ${props => props.theme.colors.primary}; 
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }

  p {
      margin-bottom: 1rem;
      line-height: 1.7;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
 
  button {
    cursor: pointer;
    font-family: inherit;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.progressWhite};
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease;

    &:hover {
      background-color: ${props => props.theme.colors.primaryHover};
      transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0px);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
    }
  }

  button.secondary {
      background-color: ${props => props.theme.colors.secondary};
      color: ${props => props.theme.colors.text};
      &:hover {
          background-color: ${props => props.theme.colors.secondaryHover};
      }
  }


  input, select, textarea {
    font-family: inherit;
    padding: 0.75rem;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 6px;
    width: 100%;
    margin-bottom: 1rem; 
    font-size: 1rem;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
    }
  }

  .container {
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 1rem;
      padding-right: 1rem;
  }

  /* Add more global styles or utility classes as needed */
`;

export default GlobalStyle;

