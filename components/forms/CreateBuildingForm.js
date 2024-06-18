import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form, Button, Alert, Modal, ListGroup, Container,
} from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createBuilding } from '../../api/BuildingData';
import { getStyles } from '../../api/StyleData';
import { getTags } from '../../api/TagData';

const initialValue = {
  name: '',
  yearBuilt: '',
  location: '',
  description: '',
  isRegistered: false,
  styleId: '',
  tags: [],
  imageURL: '',
};

function CreateBuildingForm() {
  const [formData, setFormData] = useState(initialValue);
  const [styles, setStyles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [validated, setValidated] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getStyles().then(setStyles).catch(console.error);
    getTags().then(setTags).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const {
      name, value, checked, type,
    } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      isRegistered: e.target.value === 'true',
    }));
  };

  const handleStyleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      styleId: e.target.value,
    }));
  };

  const handleToggleTag = (tagId) => {
    setSelectedTags((prevTags) => (
      prevTags.includes(tagId) ? prevTags.filter((id) => id !== tagId) : [...prevTags, tagId]
    ));
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || selectedTags.length < 2 || !formData.styleId) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (!user) {
      setSubmissionStatus({ success: false, message: 'User not authenticated' });
      return;
    }

    const formDataWithUser = { ...formData, userId: user.id, tagIds: selectedTags };

    try {
      const newBuilding = await createBuilding(formDataWithUser);

      setSubmissionStatus({ success: true, message: 'Building created successfully!' });

      try {
        await router.push(`/buildings/${newBuilding.buildingId}`);
      } catch (routerError) {
        console.error('Router push error:', routerError);
        window.location.href = `/buildings/${newBuilding.buildingId}`;
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setSubmissionStatus({ success: false, message: 'An error occurred while creating the building.' });
    }
  };

  return (
    <Container>
      <div id="createpage">
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
            <Form.Label>Building Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a building name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year Built:</Form.Label>
            <Form.Control
              type="text"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a year built.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location:</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a location.
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
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Is this building in the National Register of Historic Places?</Form.Label>
            <Form.Check
              type="radio"
              label="Yes"
              name="isRegistered"
              value="true"
              checked={formData.isRegistered === true}
              onChange={handleRadioChange}
              required
            />
            <Form.Check
              type="radio"
              label="No"
              name="isRegistered"
              value="false"
              checked={formData.isRegistered === false}
              onChange={handleRadioChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please select whether the building is registered.
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
            <Form.Label>Choose Building Style:</Form.Label>
            <Form.Select
              name="styleId"
              value={formData.styleId}
              onChange={handleStyleChange}
              required
            >
              <option value="">Select</option>
              {styles.map((style) => (
                <option key={style.styleId} value={style.styleId}>{style.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a building style.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Label>Choose Tags:</Form.Label><br />
          <Button id="choosetagsbtn" variant="light" onClick={() => setShowTagsModal(true)}>Choose Tags</Button>
          {selectedTags.length < 2 && (
            <div className="text-danger small mt-2">Please select at least two tags.</div>
          )}
          <ListGroup>
            {selectedTags.map((tagId) => {
              const tag = tags.find((t) => t.tagId === tagId);
              return tag ? (
                <ListGroup.Item key={tag.tagId}>
                  {tag.name} &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button id="remove" variant="secondary" size="sm" onClick={() => handleRemoveTag(tag.tagId)}>remove</Button>
                </ListGroup.Item>
              ) : null;
            })}
          </ListGroup><br />

          <Button id="submit" type="submit">Submit</Button>
        </Form>

        <Modal show={showTagsModal} onHide={() => setShowTagsModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Select Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {tags.map((tag) => (
              <Form.Check
                key={tag.tagId}
                label={tag.name}
                type="checkbox"
                checked={selectedTags.includes(tag.tagId)}
                onChange={() => handleToggleTag(tag.tagId)}
              />
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTagsModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
}

export default CreateBuildingForm;
