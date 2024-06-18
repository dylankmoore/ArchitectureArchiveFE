import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import BuildingDetailsCard from '../../components/BuildingDetailCard';
import { getBuildingById } from '../../api/BuildingData';
import Footer from '../footer';

function BuildingDetails() {
  const [building, setBuilding] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (router.isReady && id) {
      getBuildingById(id)
        .then((data) => {
          setBuilding(data);
        })
        .catch((err) => {
          console.error('Failed to fetch building details:', err);
          setError(err.message);
        });
    }
  }, [router.isReady, id]);

  const handleEdit = (buildingId) => {
    router.push(`/buildings/edit/${buildingId}`);
  };

  const handleDelete = (buildingId) => {
    console.warn('Deleting building:', buildingId);
    router.push('/buildings');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!building) {
    return <div>Loading...</div>;
  }

  return (
    <Container><br />
      <div id="buildingdetailtitle">
        <h4>BUILDING DETAILS</h4>
      </div>
      <hr /><br />
      <BuildingDetailsCard
        building={building}
        onDelete={handleDelete}
        onEdit={handleEdit}
      /><br />
      <Footer />
    </Container>
  );
}

export default BuildingDetails;
