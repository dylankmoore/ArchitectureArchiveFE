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
  styleId: null,
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
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleStyleChange = (e) => {
    setFormData({ ...formData, styleId: e.target.value });
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
        {submissionStatus && (
        <Alert variant={submissionStatus.success ? 'success' : 'danger'}>
          {submissionStatus.message}
        </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Building Name:</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year Built:</Form.Label>
            <Form.Control type="text" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location:</Form.Label>
            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Is this building in the National Register of Historic Places?" name="isRegistered" checked={formData.isRegistered} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL:</Form.Label>
            <Form.Control type="text" name="imageURL" value={formData.imageURL} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Choose Building Style:</Form.Label>
            <Form.Select name="styleId" value={formData.styleId} onChange={handleStyleChange}>
              <option value="">Select</option>
              {styles.map((style) => (
                <option key={style.styleId} value={style.styleId}>{style.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Label>Choose Tags:</Form.Label><br />
          <Button id="choosetagsbtn" variant="light" onClick={() => setShowTagsModal(true)}>Choose Tags</Button>
          <ListGroup><br />
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
