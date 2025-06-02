import 'styled-components';

// Define the structure of our theme
export interface AppTheme {
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    background: string;
    text: string;
    textLight: string;
    border: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    // Progress Pride Flag Colors
    progressRed: string;
    progressOrange: string;
    progressYellow: string;
    progressGreen: string;
    progressBlue: string;
    progressViolet: string;
    progressPink: string;
    progressLightBlue: string;
    progressBrown: string;
    progressBlack: string;
    progressWhite: string;
    // Other UI Colors
    lightGray: string;
    darkBackground: string;
  };
  fonts: {
    main: string;
    headings: string;
  };
  gradients: {
    progressPride: string;
    primaryDiagonal: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  shadows: {
    card: string;
  };
}

declare module 'styled-components' {

    export interface DefaultTheme extends AppTheme {}
}

export const lightTheme: AppTheme = {
  colors: {
    primary: '#8A2BE2', 
    primaryHover: '#7B24CB', 
    secondary: '#FFD700', 
    secondaryHover: '#E6C200', 
    background: '#FCFCFC', 
    text: '#212121', 
    textLight: '#555555', 
    border: '#E0E0E0',
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    // Progress Pride Flag Colors
    progressRed: '#E40303',
    progressOrange: '#FF8C00',
    progressYellow: '#FFED00',
    progressGreen: '#008026',
    progressBlue: '#004DFF',
    progressViolet: '#750787',
    progressPink: '#FFAFC8',
    progressLightBlue: '#74D4F1',
    progressBrown: '#613915',
    progressBlack: '#000000',
    progressWhite: '#FFFFFF',
    // Other UI Colors
    lightGray: '#F4F6F8', 
    darkBackground: '#331a4d', 
  },
  fonts: {
    main: '"Nunito Sans", "Open Sans", Lato, sans-serif',
    headings: '"Nunito Sans", "Open Sans", Lato, sans-serif',
  },
  gradients: {
   
    progressPride: 'linear-gradient(90deg, #E40303, #FF8C00, #FFED00, #008026, #004DFF, #750787)',
    primaryDiagonal: 'linear-gradient(135deg, #8A2BE2, #A052E8)', 
  },
  breakpoints: {
    mobile: '768px',
    tablet: '992px',
    desktop: '1200px',
  },
  shadows: {
    card: '0 4px 12px rgba(0,0,0,0.1)',
  }
};

// Define a dark theme (optional, can be refined later)
export const darkTheme: AppTheme = {
  ...lightTheme, 
  colors: {
    ...lightTheme.colors,
    primary: '#A052E8', 
    primaryHover: '#B878EA',
    secondary: '#FFD700',
    secondaryHover: '#FFE033',
    background: '#1a1a2e', 
    text: '#e0e0e0', 
    textLight: '#b0b0b0',
    border: '#444444',
    lightGray: '#2c2c3e', 
    darkBackground: '#121212',
  },
  gradients: {
      ...lightTheme.gradients,
      primaryDiagonal: 'linear-gradient(135deg, #A052E8, #C878FF)',
  },
  shadows: {
      card: '0 4px 12px rgba(0,0,0,0.3)',
  }
};

