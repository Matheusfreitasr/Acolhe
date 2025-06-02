import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.main`
  flex: 1;
  padding: 20px;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <MainContainer>
      <Navbar />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </MainContainer>
  );
};

export default MainLayout;

