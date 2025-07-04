import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import CadastroPage from '../pages/CadastroPage';
import VagasPage from '../pages/VagasPage';
import QuemSomosPage from '../pages/QuemSomosPage';
import ContatoPage from '../pages/ContatoPage';
import PoliticaPrivacidadePage from '../pages/PoliticaPrivacidadePage';
import TermosUsoPage from '../pages/TermosUsoPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/vagas" element={<VagasPage />} />
        <Route path="/quem-somos" element={<QuemSomosPage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/politica-privacidade" element={<PoliticaPrivacidadePage />} />
        <Route path="/termos-uso" element={<TermosUsoPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
