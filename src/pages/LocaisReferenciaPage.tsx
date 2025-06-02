import React from 'react';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

import logoCasaAurora from '../assets/casa_aurora.png';
import logoTransviver from '../assets/casa_transviver.png';
import logoCasaChama from '../assets/casa_chama.png';

const LocationCard = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.colors.border};
  }

  div {
    flex: 1;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.primary};
  }

  p {
    margin-bottom: 0.25rem;
    color: ${props => props.theme.colors.textLight};
  }
`;

const MapPlaceholder = styled.div`
    height: 400px;
    background-color: ${props => props.theme.colors.progressWhite};
    border: 1px dashed ${props => props.theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.textLight};
    font-style: italic;
    margin-top: 2rem;
    border-radius: 8px;
`;

const LocaisReferenciaPage: React.FC = () => {
  // Placeholder data - replace with API call later
  const locations = [
    {
      id: 1,
      name: 'Casa Aurora',
      logo: logoCasaAurora, 
      services: 'Acolhimento, apoio psicossocial.',
      contact: 'Contato: (XX) XXXX-XXXX / email@casaaurora.org',
      address: 'Endereço: (Informação restrita ou pública, a definir)',
    },
    {
      id: 2,
      name: 'Instituto Transviver',
      logo: logoTransviver, 
      services: 'Apoio jurídico, empregabilidade para pessoas trans.',
      contact: 'Contato: (XX) YYYY-YYYY / contato@transviver.org',
      address: 'Endereço: (Informação restrita ou pública, a definir)',
    },
    {
        id: 3,
        name: 'Casa Chama',
        logo: logoCasaChama, 
        services: 'Acolhimento, assistência social, atividades culturais.',
        contact: 'Contato: (XX) ZZZZ-ZZZZ / falecom@casachama.org',
        address: 'Endereço: (Informação restrita ou pública, a definir)',
    },
    // --- Adicione outros locais aqui, usando placeholderLogo ou logos específicos ---
    // Exemplo:
    // {
    //   id: 4,
    //   name: 'Outro Local',
    //   logo: placeholderLogo, 
    //   services: 'Serviços diversos.',
    //   contact: 'Contato: ...',
    //   address: 'Endereço: ...',
    // },
  ];

  return (
    <MainLayout>
      <h1>Locais de Referência</h1>
      <p>Encontre casas de acolhida e outras instituições de apoio à comunidade LGBTQIAPN+.</p>

      <div>
        {locations.map(location => (
          <LocationCard key={location.id}>
            <img src={location.logo} alt={`Logo ${location.name}`} />
            <div>
              <h3>{location.name}</h3>
              <p><strong>Serviços:</strong> {location.services}</p>
              <p><strong>Contato:</strong> {location.contact}</p>
              <p><strong>Endereço:</strong> {location.address}</p>
              {/* Add button for more details if needed */}
            </div>
          </LocationCard>
        ))}
      </div>

      {/* Placeholder for interactive map */}
      <MapPlaceholder>
        Área reservada para Mapa Interativo (Integração futura com Leaflet/Mapbox)
      </MapPlaceholder>

    </MainLayout>
  );
};

export default LocaisReferenciaPage;
