import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getAllBuildings, deleteBuilding } from '../api/BuildingData';
import BuildingCard from '../components/BuildingCard';
import Footer from './footer';

function Buildings() {
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllBuildings().then((data) => {
      setBuildings(data);
      setIsLoading(false);
    }).catch((error) => {
      console.error('Failed to fetch buildings:', error);
      setIsLoading(false);
    });
  }, []);

  const handleViewMore = (buildingId) => {
    router.push(`/buildings/${buildingId}`);
  };

  const handleEdit = (buildingId) => {
    router.push(`/buildings/edit/${buildingId}`);
  };

  const handleDelete = (buildingId) => {
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
    <Container><br />
      <div id="archivetitle">
        <h4>ARCHIVE</h4>
      </div>
      <hr /><br />
      {renderContent()}
      <Footer />
    </Container>
  );
}

export default Buildings;
