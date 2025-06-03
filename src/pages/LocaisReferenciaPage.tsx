import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import logoCasaAurora from '../assets/casa_aurora.png';
import logoTransviver from '../assets/casa_transviver.png';
import logoCasaChama from '../assets/casa_chama.png';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const PageContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 3rem;
`;

const PageTitle = styled.h1`
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
`;

const PageDescription = styled.p`
  color: #8A2BE2;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const LocationCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1.5rem;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

const LocationLogo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid #eee;
`;

const MapWrapper = styled.div`
  height: 500px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;
  
  .leaflet-container {
    height: 100%;
    width: 100%;
  }
  
  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 576px) {
    height: 350px;
  }
`;

const LocaisReferenciaPage: React.FC = () => {
  // Dados das instituições com coordenadas reais
  const locations = [
    {
      id: 1,
      name: 'Casa Aurora',
      logo: logoCasaAurora, 
      services: 'Acolhimento, apoio psicossocial.',
      contact: 'Contato: (71) 3019-7545 / casadeacolhimentoaurora@gmail.com',
      address: 'Salvador - BA',
      position: [-12.216398644781878, -41.33731369735138] as [number, number],
    },
    {
      id: 2,
      name: 'Instituto Transviver',
      logo: logoTransviver, 
      services: 'Apoio jurídico, empregabilidade para pessoas trans.',
      contact: 'Contato: (81) 98359009 / transviverbr@gmail.com',
      address: 'RUA DA AURORA, APTO 0502 EDF SAO CRISTOVAO CXPST 1173. BOA VISTA, Recife - PE',
      position: [-8.060916237750805, -34.881259367596854] as [number, number],
    },
    {
      id: 3,
      name: 'Casa Chama',
      logo: logoCasaChama, 
      services: 'Acolhimento, assistência social, atividades culturais.',
      contact: 'Contato:  (11) 99448-2641 / casachama440@gmail.com',
      address: 'R. Jandaia, 128 - Bela Vista, São Paulo - SP',
      position: [-23.554587994876265, -46.63796693787061] as [number, number], 
    },
  ];

  // Centro do mapa (Brasil)
  const mapCenter: [number, number] = [-15.7801, -47.9292];
  const mapZoom = 4;

  return (
    <MainLayout>
      <PageContainer>
        <PageTitle>Locais de Referência</PageTitle>
        <PageDescription>
          Encontre casas de acolhida e outras instituições de apoio à comunidade LGBTQIAPN+ em todo o Brasil.
        </PageDescription>

        <MapWrapper>
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((location) => (
              <Marker key={location.id} position={location.position}>
                <Popup>
                  <div>
                    <h5>{location.name}</h5>
                    <p>{location.address}</p>
                    <p><small>{location.contact}</small></p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </MapWrapper>

        <Row>
          {locations.map((location) => (
            <Col key={location.id} xs={12} md={6} lg={4}>
              <LocationCard>
                <Card.Body className="d-flex align-items-center">
                  <LocationLogo src={location.logo} alt={`Logo ${location.name}`} />
                  <div className="ms-3">
                    <Card.Title className="mb-1">{location.name}</Card.Title>
                    <Card.Text className="mb-1 small">{location.services}</Card.Text>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <small className="text-muted d-block mb-1">{location.address}</small>
                  <small className="text-muted">{location.contact}</small>
                </Card.Footer>
              </LocationCard>
            </Col>
          ))}
        </Row>
      </PageContainer>
    </MainLayout>
  );
};

export default LocaisReferenciaPage;
