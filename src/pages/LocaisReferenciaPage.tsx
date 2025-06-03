import React from 'react';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

import logoCasaAurora from '../assets/casa_aurora.png';
import logoTransviver from '../assets/casa_transviver.png';
import logoCasaChama from '../assets/casa_chama.png';

// Container for the page content (Consistent with other pages)
const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.primary};
  }

  > p { // Target the main description paragraph
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.textLight};
    font-size: 1.1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1.5rem;
    h1 { font-size: 1.8rem; }
    > p { font-size: 1rem; margin-bottom: 1.5rem; }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
    h1 { font-size: 1.6rem; }
    > p { font-size: 0.95rem; margin-bottom: 1rem; }
  }
`;

// Grid container for location cards
const LocationsGrid = styled.div`
  display: grid;
  // Using 1fr for single column, adjust if multiple columns are desired on larger screens
  grid-template-columns: 1fr; 
  gap: 1.5rem;

  // Example: If you want 2 columns on tablet and above:
  // @media (min-width: ${props => props.theme.breakpoints.tablet}) {
  //   grid-template-columns: repeat(2, 1fr);
  // }
`;

// Refined Location Card
const LocationCard = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  // Removed margin-bottom, handled by grid gap
  border-radius: 8px;
  background-color: ${props => props.theme.colors.progressWhite};
  box-shadow: ${props => props.theme.shadows.card};
  display: flex;
  gap: 1.5rem;
  align-items: flex-start; // Align items to the top
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }

  img {
    width: 80px; // Slightly smaller image
    height: 80px;
    object-fit: contain;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.colors.border};
    flex-shrink: 0; // Prevent image from shrinking
  }

  .location-details {
    flex: 1;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: ${props => props.theme.colors.primary};
  }

  p {
    margin-bottom: 0.3rem;
    color: ${props => props.theme.colors.textLight};
    font-size: 0.9rem;
    line-height: 1.5;
  }

  p strong {
      color: ${props => props.theme.colors.text};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column; // Stack image and details vertically
    align-items: center; // Center items when stacked
    text-align: center; // Center text
    padding: 1rem;
    gap: 1rem;

    img {
        width: 70px;
        height: 70px;
        margin-bottom: 0.5rem; // Add space below image
    }

    h3 { font-size: 1.1rem; }
    p { font-size: 0.85rem; }
  }
`;

const MapPlaceholder = styled.div`
    height: 350px; // Adjusted height
    background-color: ${props => props.theme.colors.lightGray};
    border: 1px dashed ${props => props.theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.textLight};
    font-style: italic;
    margin-top: 2rem;
    border-radius: 8px;
    text-align: center;
    padding: 1rem;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
        height: 250px;
        font-size: 0.9rem;
    }
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
    // Add more locations here
  ];

  return (
    <MainLayout>
      <PageContainer>
        <h1>Locais de Referência</h1>
        <p>Encontre casas de acolhida e outras instituições de apoio à comunidade LGBTQIAPN+.</p>

        <LocationsGrid>
          {locations.map(location => (
            <LocationCard key={location.id}>
              <img src={location.logo} alt={`Logo ${location.name}`} />
              <div className="location-details">
                <h3>{location.name}</h3>
                <p><strong>Serviços:</strong> {location.services}</p>
                <p><strong>Contato:</strong> {location.contact}</p>
                <p><strong>Endereço:</strong> {location.address}</p>
                {/* Add button for more details if needed */}
              </div>
            </LocationCard>
          ))}
        </LocationsGrid>

        {/* Placeholder for interactive map */}
        <MapPlaceholder>
          Área reservada para Mapa Interativo (Integração futura com Leaflet/Mapbox)
        </MapPlaceholder>
      </PageContainer>
    </MainLayout>
  );
};

export default LocaisReferenciaPage;

