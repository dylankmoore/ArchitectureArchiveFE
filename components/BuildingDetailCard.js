/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import {
  Card, Button, Modal, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function BuildingDetailsCard({ building, onDelete, onEdit }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete(building.buildingId);
    setShowModal(false);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" className="custom-tooltip" {...props}>
      Indicates if the building is listed in the National Register of Historic Places.
    </Tooltip>
  );

  return (
    <div id="detailcontainer">
      <Card className="detailcard">
        <Card.Img variant="top" src={building.imageURL} alt="Building Image" height="450px" />
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{building.name}</Card.Title><br />
          <Card.Text>
            <b>Location</b>: {building.location}<br /><br />
            <b>Year Built</b>: {building.yearBuilt}<br /><br />
            <b>Style</b>: {building.style}<br /><br />
            <OverlayTrigger placement="right" overlay={renderTooltip}>
              <b>Registered</b>
            </OverlayTrigger>: {building.isRegisteredBool ? 'Yes' : 'No'}<br /><br />
            <b>Description</b>: {building.description}<br /><br />
            <b>Tags</b>: {building.tags.join(', ')}<br />
          </Card.Text>
          <div id="button-group" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button id="edit" onClick={() => onEdit(building.buildingId)}>
              <img src="/edit.png" alt="Edit" height="20px" width="20px" />
            </Button>
            <Button id="delete" onClick={() => setShowModal(true)}>
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
          Are you sure you want to delete this building?
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

BuildingDetailsCard.propTypes = {
  building: PropTypes.shape({
    buildingId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    yearBuilt: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    isRegisteredBool: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageURL: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default BuildingDetailsCard;
