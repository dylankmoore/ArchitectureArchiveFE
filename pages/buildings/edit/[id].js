import React from 'react';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import UpdateBuildingForm from '../../../components/forms/UpdateBuildingForm';
import Footer from '../../footer';

const EditBuildingPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <br />
      <div id="edittitle">
        <h4>EDIT BUILDING</h4>
      </div><hr />
      <br />
      <div id="updatepage">
        <UpdateBuildingForm buildingId={parseInt(id, 10)} />
      </div>
      <Footer />
    </Container>
  );
};

export default EditBuildingPage;
