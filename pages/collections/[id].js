import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import CollectionDetailCard from '../../components/CollectionDetailCard';
import { getCollectionById, deleteCollection, updateCollection } from '../../api/CollectionData';
import Footer from '../footer';

function CollectionDetails() {
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const fetchCollection = async (collectionId) => {
    try {
      const data = await getCollectionById(collectionId);
      setCollection(data);
    } catch (err) {
      console.error('Failed to fetch collection details:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (router.isReady && id) {
      fetchCollection(parseInt(id, 10));
    }
  }, [router.isReady, id]);

  const handleEdit = (collectionId) => {
    router.push(`/collections/edit/${collectionId}`);
  };

  const handleDelete = async (collectionId) => {
    try {
      await deleteCollection(collectionId);
      router.push('/collections');
    } catch (err) {
      console.error('Failed to delete collection:', err);
      setError('Failed to delete collection.');
    }
  };

  const handleViewBuilding = (buildingId) => {
    router.push(`/buildings/${buildingId}`);
  };

  const handleDeleteBuildingFromCollection = async (buildingId) => {
    try {
      const updatedBuildings = collection.buildings.filter((building) => building.buildingId !== buildingId);
      const updatedCollection = { ...collection, buildings: updatedBuildings };

      await updateCollection(collection.collectionId, {
        ...updatedCollection,
        buildingIds: updatedBuildings.map((b) => b.buildingId),
      });

      setCollection(updatedCollection);
    } catch (err) {
      console.error('Failed to delete building from collection:', err);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!collection) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <hr />
      <CollectionDetailCard
        collection={collection}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onViewBuilding={handleViewBuilding}
        onDeleteBuildingFromCollection={handleDeleteBuildingFromCollection}
      /><br />
      <Footer />
    </Container>
  );
}

export default CollectionDetails;
