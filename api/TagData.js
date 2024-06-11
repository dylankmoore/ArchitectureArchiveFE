import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// ADD tags to building
const addTagsToBuilding = (buildingId, tagIds) => {
  const url = `${endpoint}/buildings/${buildingId}/tags`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tagIds),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add tags to building');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// DELETE tag from building
const deleteTagFromBuilding = (buildingId, tagId) => {
  const url = `${endpoint}/buildings/${buildingId}/tags/${tagId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete tag from building');
        }
        resolve();
      })
      .catch((error) => reject(error));
  });
};

// GET all tags
const getTags = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

export {
  addTagsToBuilding, deleteTagFromBuilding, getTags,
};
