/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function BuildingCard({
  building, onViewMore, onEdit, onDelete,
}) {
  return (
    <div className="card-container">
      <Card> {/* Make width 100% to fill the container */}
        <Card.Img variant="top" src={building.imageURL} alt="Building Image" height="300px" width="250px" />
        <Card.Body>
          <Card.Title>{building.name}</Card.Title>
          <Card.Text>
            Location: {building.location}<br />
            Year Built: {building.yearBuilt}<br />
            Style: {building.style}
          </Card.Text>
          <Button variant="primary" onClick={() => onViewMore(building.buildingId)}>View More</Button>
          <Button variant="secondary" onClick={() => onEdit(building.buildingId)}>Edit</Button>
          <Button variant="danger" onClick={() => onDelete(building.buildingId)}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

BuildingCard.propTypes = {
  building: PropTypes.shape({
    buildingId: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.string,
    yearBuilt: PropTypes.string,
    style: PropTypes.string,
    imageURL: PropTypes.string,
  }).isRequired,
  onViewMore: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BuildingCard;
