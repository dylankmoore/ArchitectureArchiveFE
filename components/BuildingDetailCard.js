/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import {
  Container, Row, Col, Image, Button, Modal, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function BuildingDetailsSection({ building, onDelete, onEdit }) {
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
    <Container className="building-detail">
      <Row>
        <Col md={6}>
          <Image src={building.imageURL} alt={building.name} fluid />
        </Col>
        <Col md={6}>
          <h2>{building.name}</h2><br />
          <p><strong>Location:</strong> {building.location}</p>
          <p><strong>Year Built:</strong> {building.yearBuilt}</p>
          <p><strong>Style:</strong> {building.style}</p>
          <OverlayTrigger placement="right" overlay={renderTooltip}>
            <span><strong>Registered:</strong> {building.isRegisteredBool ? 'Yes' : 'No'}</span>
          </OverlayTrigger>
          <p />
          <p><strong>Description:</strong> {building.description}</p>
          <p><strong>Tags:</strong> {building.tags.join(', ')}</p>
          <div id="button-group" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button id="edit2" variant="secondary-outline" onClick={() => onEdit(building.buildingId)}>
              <img src="/edit.png" alt="Edit" title="Edit Building" height="20px" width="20px" />
            </Button>
            <Button id="delete2" variant="secondary-outline" onClick={() => setShowModal(true)}>
              <img src="/delete.png" alt="Delete" title="Delete Building" height="20px" width="20px" />
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this building?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

BuildingDetailsSection.propTypes = {
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

export default BuildingDetailsSection;
