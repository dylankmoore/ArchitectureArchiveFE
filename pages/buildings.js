import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getAllBuildings } from '../api/BuildingData';
import BuildingCard from '../components/BuildingCard';

function Buildings() {
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllBuildings().then((data) => {
      console.warn('Data received:', data);
      setBuildings(data);
      setIsLoading(false);
    }).catch((error) => {
      console.error('Failed to fetch buildings:', error);
      setIsLoading(false);
    });
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (buildings.length > 0) {
      return (
        <div className="archive">
          {buildings.map((building) => (
            <BuildingCard
              key={building.BuildingId}
              building={building}
              onViewMore={() => console.warn('Viewing more:', building.BuildingId)}
              onEdit={() => console.warn('Editing:', building.BuildingId)}
              onDelete={() => console.warn('Deleting:', building.BuildingId)}
            />
          ))}
        </div>
      );
    }

    return <p>No buildings to show currently.</p>;
  };

  return (
    <Container>
      <br />
      <h1>All Buildings</h1>
      <hr /><br />
      {renderContent()}
    </Container>
  );
}

export default Buildings;
