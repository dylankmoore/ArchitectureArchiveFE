// pages/buildings/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import BuildingDetailsCard from '../../components/BuildingDetailCard';
import { getBuildingById } from '../../api/BuildingData';

function BuildingDetails() {
  const [building, setBuilding] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (router.isReady && id) {
      getBuildingById(id)
        .then(setBuilding)
        .catch((err) => {
          console.error('Failed to fetch building details:', err);
          setError(err.message);
        });
    }
  }, [router.isReady, id]);

  const handleEdit = (buildingId) => {
    // Navigate to edit page
    router.push(`/buildings/edit/${buildingId}`);
  };

  const handleDelete = (buildingId) => {
    // API call to delete building
    console.warn('Deleting building:', buildingId);
    // Optionally navigate back to the building list
    router.push('/buildings');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!building) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <br />
      <h1>Building Details</h1>
      <hr /><br />
      <BuildingDetailsCard
        building={building}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Container>
  );
}

export default BuildingDetails;
