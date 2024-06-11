import React from 'react';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import UpdateBuildingForm from '../../../components/forms/UpdateBuildingForm';

const EditBuildingPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Edit Building</h1>
      <UpdateBuildingForm buildingId={parseInt(id, 10)} />
    </Container>
  );
};

export default EditBuildingPage;
