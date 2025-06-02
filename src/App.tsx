import React from 'react';
import AppRouter from './router';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}> {/* Wrap with ThemeProvider */}
      <GlobalStyle /> {/* Apply global styles */}
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;

