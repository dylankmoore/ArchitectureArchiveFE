/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function BuildingDetailsCard({ building, onDelete, onEdit }) {
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
            <b>Description</b>: {building.description}<br /><br />
            <b>Tags</b>: {building.tags.join(', ')}<br />
          </Card.Text>
          <Button variant="secondary" onClick={() => onEdit(building.buildingId)}>Edit</Button>
          <Button variant="danger" onClick={() => onDelete(building.buildingId)}>Delete</Button>
        </Card.Body>
      </Card>
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
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageURL: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default BuildingDetailsCard;
