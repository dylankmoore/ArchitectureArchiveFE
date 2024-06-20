/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

function CollectionCard({
  collection, onViewMore, onEdit, onDelete,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete(collection.collectionId);
    setShowModal(false);
  };

  return (
    <div className="card-container">
      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={collection.imageURL} alt="Collection Image" height="300px" />
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{collection.name}</Card.Title>
          <div id="button-group" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button id="view" title="View More Details" onClick={() => onViewMore(collection.collectionId)}>
              <img src="/view.png" title="View Collection Details" alt="View Collection Details" height="20px" width="20px" />
            </Button>
            <Button id="edit" title="Edit" onClick={() => onEdit(collection.collectionId)}>
              <img src="/edit.png" alt="Edit Collection" title="Edit Collection" height="20px" width="20px" />
            </Button>
            <Button id="delete" alt="Delete Collection" title="Delete Collection" onClick={() => setShowModal(true)}>
              <img src="/delete.png" alt="Delete" height="20px" width="20px" />
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this collection?
        </Modal.Body>
        <Modal.Footer>
          <Button id="cancel" variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button id="confirmdelete" variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

CollectionCard.propTypes = {
  collection: PropTypes.shape({
    collectionId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buildings: PropTypes.arrayOf(PropTypes.shape({
      buildingId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onViewMore: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CollectionCard;
