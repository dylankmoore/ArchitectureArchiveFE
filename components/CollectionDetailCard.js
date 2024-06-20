/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import {
  Container, Row, Col, Image, Button, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import BuildingCard from './BuildingCard';

function CollectionDetailCard({
  collection, onEdit, onDelete, onViewBuilding, onDeleteBuildingFromCollection,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete(collection.collectionId);
    setShowModal(false);
  };

  return (
    <Container className="collection-detail">
      <Row className="d-flex justify-content-between">
        <Col md={4} className="d-flex flex-column align-items-center" style={{ marginTop: '30px', marginLeft: '30px' }}>
          <Image src={collection.imageURL} alt={collection.name} fluid />
          <h2 className="mt-3">{collection.name}</h2><br />
          <p>{collection.description}</p>
          <div id="button-group" className="mt-3" style={{ display: 'flex', gap: '10px' }}>
            <Button id="edit2" variant="secondary-outline" onClick={() => onEdit(collection.collectionId)}>
              <img src="/edit.png" title="Edit Collection" alt="Edit" height="20px" width="20px" />
            </Button>
            <Button id="delete2" variant="secondary-outline" onClick={() => setShowModal(true)}>
              <img src="/delete.png" alt="Delete" title="Delete Collection" height="20px" width="20px" />
            </Button>
          </div>
        </Col>
        <Col md={7} id="columns">
          <div className="building-list d-flex flex-wrap">
            {collection.buildings.map((building) => (
              <div key={building.buildingId} className="p-2" style={{ flex: '1 0 45%', maxWidth: '50%' }}>
                <BuildingCard
                  building={building}
                  onViewMore={onViewBuilding}
                  onDeleteFromCollection={onDeleteBuildingFromCollection}
                  context="collection"
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this collection?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" id="cancel" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" id="confirmdelete" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

CollectionDetailCard.propTypes = {
  collection: PropTypes.shape({
    collectionId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    description: PropTypes.string,
    buildings: PropTypes.arrayOf(PropTypes.shape({
      buildingId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewBuilding: PropTypes.func.isRequired,
  onDeleteBuildingFromCollection: PropTypes.func.isRequired,
};

export default CollectionDetailCard;
