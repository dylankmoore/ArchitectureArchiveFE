import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form, Button, Container, ListGroup, Modal, Alert,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { getCollectionById, updateCollection } from '../../api/CollectionData';
import { getAllBuildings } from '../../api/BuildingData';

const initialFormState = {
  name: '',
  imageURL: '',
  description: '',
  buildingIds: [],
};

function UpdateCollectionForm({ collectionId }) {
  const [formData, setFormData] = useState(initialFormState);
  const [buildings, setBuildings] = useState([]);
  const [selectedBuildings, setSelectedBuildings] = useState([]);
  const [showBuildingsModal, setShowBuildingsModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionData = await getCollectionById(collectionId);
        const buildingsData = await getAllBuildings();

        setFormData({
          name: collectionData.name,
          imageURL: collectionData.imageURL,
          description: collectionData.description,
          buildingIds: collectionData.buildings.map((building) => building.buildingId),
        });

        setBuildings(buildingsData);
        setSelectedBuildings(collectionData.buildings.map((building) => building.buildingId));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (collectionId) {
      fetchData();
    }
  }, [collectionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleBuilding = (buildingId) => {
    setSelectedBuildings((prevBuildings) => (
      prevBuildings.includes(buildingId) ? prevBuildings.filter((id) => id !== buildingId) : [...prevBuildings, buildingId]
    ));
  };

  const handleRemoveBuilding = (buildingId) => {
    setSelectedBuildings((prevBuildings) => prevBuildings.filter((id) => id !== buildingId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || selectedBuildings.length < 1) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const updatedData = {
      ...formData,
      buildingIds: selectedBuildings,
      userId: user.id,
    };

    try {
      await updateCollection(collectionId, updatedData);
      setSubmissionStatus({ success: true, message: 'Collection updated successfully!' });
      router.push(`/collections/${collectionId}`);
    } catch (error) {
      console.error('Error during form submission:', error);
      setSubmissionStatus({ success: false, message: 'An error occurred while updating the collection.' });
    }
  };

  return (
    <div id="updatecollection">
      <Container>
        {submissionStatus && submissionStatus.success && (
        <Alert variant="success">
          {submissionStatus.message}
        </Alert>
        )}
        {submissionStatus && !submissionStatus.success && (
        <Alert variant="danger">
          {submissionStatus.message}
        </Alert>
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Collection Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a collection name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL:</Form.Label>
            <Form.Control
              type="text"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide an image URL.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
          </Form.Group><br />

          <Form.Label>Choose Buildings:</Form.Label><br />
          <Button id="choosetagsbtn" variant="light" onClick={() => setShowBuildingsModal(true)}>Choose Buildings</Button>
          {selectedBuildings.length < 1 && (
          <div className="text-danger small mt-2">Please select at least one building.</div>
          )}
          <ListGroup>
            {selectedBuildings.map((buildingId) => {
              const building = buildings.find((b) => b.buildingId === buildingId);
              return building ? (
                <ListGroup.Item key={building.buildingId}>
                  {building.name} &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="secondary" size="sm" onClick={() => handleRemoveBuilding(building.buildingId)}>remove</Button>
                </ListGroup.Item>
              ) : null;
            })}
          </ListGroup><br />

          <Button id="submit" type="submit">Submit</Button>
        </Form>

        <Modal show={showBuildingsModal} onHide={() => setShowBuildingsModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Select Buildings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {buildings.map((building) => (
              <Form.Check
                key={building.buildingId}
                label={building.name}
                type="checkbox"
                checked={selectedBuildings.includes(building.buildingId)}
                onChange={() => handleToggleBuilding(building.buildingId)}
              />
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowBuildingsModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

UpdateCollectionForm.propTypes = {
  collectionId: PropTypes.number.isRequired,
};

export default UpdateCollectionForm;
