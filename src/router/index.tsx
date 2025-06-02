import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AtendimentosPage from '../pages/AtendimentosPage';
import VoluntariadoPage from '../pages/VoluntariadoPage';
import ProgramacaoPage from '../pages/ProgramacaoPage';
import VagasPage from '../pages/VagasPage';
import LocaisReferenciaPage from '../pages/LocaisReferenciaPage';
import QuemSomosPage from '../pages/QuemSomosPage';
import ContatoPage from '../pages/ContatoPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/atendimentos" element={<AtendimentosPage />} />
        <Route path="/seja-voluntario" element={<VoluntariadoPage />} />
        <Route path="/programacao" element={<ProgramacaoPage />} />
        <Route path="/vagas" element={<VagasPage />} />
        <Route path="/locais-referencia" element={<LocaisReferenciaPage />} />
        <Route path="/quem-somos" element={<QuemSomosPage />} />
        <Route path="/contato" element={<ContatoPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
