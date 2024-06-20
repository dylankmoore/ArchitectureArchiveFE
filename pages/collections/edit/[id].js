import React from 'react';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import UpdateCollectionForm from '../../../components/forms/UpdateCollectionForm';
import Footer from '../../footer';

const EditCollectionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  const collectionId = parseInt(id, 10);
  console.warn(`Parsed collection ID: ${collectionId}`); // Log collectionId

  if (Number.isNaN(collectionId)) {
    console.error('Invalid collection ID:', id);
    return <div>Invalid collection ID</div>;
  }

  return (
    <Container>
      <br />
      <div id="edittitle">
        <h4>EDIT COLLECTION</h4>
      </div>
      <hr />
      <br />
      <div id="updatecollection">
        <UpdateCollectionForm collectionId={collectionId} />
      </div>
      <Footer />
    </Container>
  );
};

export default EditCollectionPage;
