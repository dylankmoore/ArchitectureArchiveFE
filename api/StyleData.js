import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// ADD style to building
const addStyleCategory = (buildingId, styleId) => {
  const url = `${endpoint}/buildings/${buildingId}/style`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ styleId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add style to building');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// DELETE style from building
const deleteStyleFromBuilding = (buildingId, styleId) => {
  const url = `${endpoint}/buildings/${buildingId}/styles/${styleId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete style from building');
        }
        resolve();
      })
      .catch((error) => reject(error));
  });
};

export {
  addStyleCategory, deleteStyleFromBuilding,
};
