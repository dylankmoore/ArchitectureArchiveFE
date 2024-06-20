import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// CREATE a collection
const createCollection = (collectionDetails) => {
  const url = `${endpoint}/collections/new`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collectionDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create new collection.');
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// GET all collections
const getAllCollections = () => {
  const url = `${endpoint}/collections`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch collections');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// GET collection by ID
const getCollectionById = (collectionId) => {
  const url = `${endpoint}/collections/${collectionId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch collection details');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// UPDATE a collection
const updateCollection = (collectionId, collectionData) => {
  const url = `${endpoint}/collections/${collectionId}`;
  console.warn(`Updating collection with ID: ${collectionId}`);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collectionData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update collection');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// DELETE a collection
const deleteCollection = (collectionId) => {
  const url = `${endpoint}/collections/${collectionId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete collection');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export {
  getAllCollections, getCollectionById, createCollection, updateCollection, deleteCollection,
};
