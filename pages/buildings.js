import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getAllBuildings, deleteBuilding } from '../api/BuildingData';
import BuildingCard from '../components/BuildingCard';

function Buildings() {
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const handleViewMore = (buildingId) => {
    console.warn(`View more details for building ID: ${buildingId}`);
    router.push(`/buildings/${buildingId}`);
  };

  const handleEdit = (buildingId) => {
    console.warn(`Edit building ID: ${buildingId}`);
    router.push(`/buildings/edit/${buildingId}`);
  };

  const handleDelete = (buildingId) => {
    console.warn(`Delete building ID: ${buildingId}`);
    deleteBuilding(buildingId).then(() => {
      setBuildings(buildings.filter((building) => building.buildingId !== buildingId));
    }).catch((error) => {
      console.error('Failed to delete building:', error);
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (buildings.length > 0) {
      return (
        <div className="archive">
          {buildings.map((building) => (
            <BuildingCard
              key={building.buildingId}
              building={building}
              onViewMore={() => handleViewMore(building.buildingId)}
              onEdit={() => handleEdit(building.buildingId)}
              onDelete={() => handleDelete(building.buildingId)}
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
