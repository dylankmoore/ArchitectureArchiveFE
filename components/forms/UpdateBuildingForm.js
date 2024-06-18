import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form, Button, Modal, ListGroup, Container,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { getBuildingById, updateBuilding } from '../../api/BuildingData';
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

function UpdateBuildingForm({ buildingId }) {
  const [formData, setFormData] = useState(initialValue);
  const [styles, setStyles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buildingData = await getBuildingById(buildingId);
        const stylesData = await getStyles();
        const tagsData = await getTags();

        setStyles(stylesData);
        setTags(tagsData);

        const tagIds = buildingData.tags.map((tagName) => tagsData.find((tag) => tag.name === tagName)?.tagId).filter((tagId) => tagId !== undefined);

        setSelectedTags(tagIds);

        setFormData({
          name: buildingData.name,
          yearBuilt: buildingData.yearBuilt,
          location: buildingData.location,
          description: buildingData.description,
          isRegistered: buildingData.isRegisteredBool,
          styleId: buildingData.styleId,
          tags: tagIds,
          imageURL: buildingData.imageURL,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [buildingId]);

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
      console.error('User not authenticated');
      return;
    }

    const updatedData = {
      ...formData,
      tagIds: selectedTags,
      userId: user.id,
      isRegistered: formData.isRegistered,
    };

    try {
      const response = await updateBuilding(buildingId, updatedData);

      if (response && response.building && response.building.buildingId) {
        router.push(`/buildings/${response.building.buildingId}`);
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div id="updatepage">
      <Container><br />
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Building Name:</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">
              Please provide a building name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Year Built:</Form.Label>
            <Form.Control type="text" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">
              Please provide a year built.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Location:</Form.Label>
            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">
              Please provide a location.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Description:</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Is this building in the National Register of Historic Places?</Form.Label>
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
            <Form.Label style={{ fontWeight: 'bold' }}>Image URL:</Form.Label>
            <Form.Control type="text" name="imageURL" value={formData.imageURL} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">
              Please provide an image URL.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Choose Building Style:</Form.Label>
            <Form.Select name="styleId" value={formData.styleId} onChange={handleStyleChange} required>
              <option value="">Select</option>
              {styles.map((style) => (
                <option key={style.styleId} value={style.styleId}>{style.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a building style.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Label style={{ fontWeight: 'bold' }}>Choose Tags:</Form.Label><br />
          <Button id="choosetagsbtn" variant="light" onClick={() => setShowTagsModal(true)}>Choose Tags</Button>
          {selectedTags.length < 2 && (
            <div className="text-danger small mt-2">Please select at least two tags.</div>
          )}
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
        </Form><br />

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
      </Container>
    </div>
  );
}

UpdateBuildingForm.propTypes = {
  buildingId: PropTypes.number.isRequired,
};

export default UpdateBuildingForm;
