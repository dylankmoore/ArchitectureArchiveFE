import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form, Button, Modal, ListGroup, Container, Alert,
} from 'react-bootstrap';
import { getAllBuildings } from '../../api/BuildingData';
import { createCollection } from '../../api/CollectionData';

const initialFormData = {
  name: '',
  imageURL: '',
  description: '',
  buildingIds: [],
};

const CreateCollectionForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [buildings, setBuildings] = useState([]);
  const [selectedBuildings, setSelectedBuildings] = useState([]);
  const [showBuildingsModal, setShowBuildingsModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getAllBuildings().then(setBuildings).catch(console.error);
  }, []);

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
    if (form.checkValidity() === false || selectedBuildings.length === 0) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const formDataWithBuildings = { ...formData, buildingIds: selectedBuildings };

    try {
      const newCollection = await createCollection(formDataWithBuildings);
      router.push(`/collections/${newCollection.collectionId}`);
    } catch (error) {
      console.error('Error during form submission:', error);
      setSubmissionStatus({ success: false, message: 'An error occurred while saving the collection.' });
    }
  };

  return (
    <Container className="wider-container">
      <div id="createcollection">
        {submissionStatus && !submissionStatus.success && (
          <Alert variant="danger" className="small-alert">
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
          {selectedBuildings.length === 0 && (
            <div className="text-danger small mt-2">Please select at least one building.</div>
          )}
          <ListGroup>
            {selectedBuildings.map((buildingId) => {
              const building = buildings.find((b) => b.buildingId === buildingId);
              return building ? (
                <ListGroup.Item key={building.buildingId}>
                  {building.name}
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
      </div>
    </Container>
  );
};

export default CreateCollectionForm;
