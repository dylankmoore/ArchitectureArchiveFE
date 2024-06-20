/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

function BuildingCard({
  building, onViewMore, onEdit, onDelete, context, onDeleteFromCollection,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    if (context === 'collection') {
      onDeleteFromCollection(building.buildingId);
    } else {
      onDelete(building.buildingId);
    }
    setShowModal(false);
  };

  return (
    <div className="card-container">
      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={building.imageURL} alt={building.name} height="300px" />
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{building.name}</Card.Title><br />
          <Card.Text>
            <b>Location:</b> {building.location}<br />
            <b>Year Built:</b> {building.yearBuilt}<br />
            <b>Style:</b> {building.style}
          </Card.Text>
          <div id="button-group" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button id="view" title="View More Details" onClick={() => onViewMore(building.buildingId)}>
              <img src="/view.png" alt="View" height="20px" width="20px" />
            </Button>
            {context === 'collection' ? (
              <Button id="delete" title="Remove from Collection" onClick={() => setShowModal(true)}>
                <img src="/delete.png" alt="Remove" height="20px" width="20px" />
              </Button>
            ) : (
              <>
                <Button id="edit" title="Edit" onClick={() => onEdit(building.buildingId)}>
                  <img src="/edit.png" alt="Edit" height="20px" width="20px" />
                </Button>
                <Button id="delete" title="Delete" onClick={() => setShowModal(true)}>
                  <img src="/delete.png" alt="Delete" height="20px" width="20px" />
                </Button>
              </>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {context === 'collection' ? 'remove this building from the collection' : 'delete this building'}?
        </Modal.Body>
        <Modal.Footer>
          <Button id="cancel" variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button id="confirmdelete" variant="danger" onClick={handleDelete}>
            {context === 'collection' ? 'Remove' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

BuildingCard.propTypes = {
  building: PropTypes.shape({
    buildingId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    yearBuilt: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
  }).isRequired,
  onViewMore: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  context: PropTypes.string,
  onDeleteFromCollection: PropTypes.func,
};

BuildingCard.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
  context: 'default',
  onDeleteFromCollection: () => {},
};

export default BuildingCard;
