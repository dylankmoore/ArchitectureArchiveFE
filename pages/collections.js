import React, { useEffect, useState } from 'react';
import {
  Container, Button, Row, Col,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getAllCollections, deleteCollection } from '../api/CollectionData';
import CollectionCard from '../components/CollectionCard';
import Footer from './footer';

function Collections() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllCollections().then((data) => {
      setCollections(data);
      setIsLoading(false);
    }).catch((error) => {
      console.error('Failed to fetch collections:', error);
      setIsLoading(false);
    });
  }, []);

  const handleViewMore = (collectionId) => {
    router.push(`/collections/${collectionId}`);
  };

  const handleEdit = (collectionId) => {
    router.push(`/collections/edit/${collectionId}`);
  };

  const handleDelete = (collectionId) => {
    deleteCollection(collectionId).then(() => {
      setCollections(collections.filter((collection) => collection.collectionId !== collectionId));
    }).catch((error) => {
      console.error('Failed to delete collection:', error);
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (collections.length > 0) {
      return (
        <div className="archive">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.collectionId}
              collection={collection}
              onViewMore={() => handleViewMore(collection.collectionId)}
              onEdit={() => handleEdit(collection.collectionId)}
              onDelete={() => handleDelete(collection.collectionId)}
            />
          ))}
        </div>
      );
    }

    return <p>No collections to show currently.</p>;
  };

  return (
    <Container>
      <br />
      <div id="archivetitle">
        <h4>COLLECTIONS</h4>
      </div>
      <hr />
      <Row>
        <Col md={4}>
          <div id="collection-description">
            <p>Collections allow you to group buildings together for easier organization and management. You can create a new collection, add buildings to it, and manage existing collections. Use the buttons below each collection to view more details, edit, or delete the collection.</p><br />
            <Button
              id="newcollectionbtn"
              variant="primary"
              onClick={() => router.push('/collections/new')}
            >
              Create New Collection
            </Button>
          </div>
        </Col>
        <Col md={8}>
          {renderContent()}
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default Collections;
