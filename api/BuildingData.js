import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// CREATE a building
const createBuilding = (buildingDetails) => {
  const url = `${endpoint}/buildings/new`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildingDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create new building.');
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

// GET all buildings
const getAllBuildings = () => {
  const url = `${endpoint}/buildings`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch buildings');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// GET building by ID
const getBuildingById = (buildingId) => {
  const url = `${endpoint}/buildings/${buildingId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch building details');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// UPDATE a building
const updateBuilding = (buildingId, buildingData) => {
  const url = `${endpoint}/buildings/${buildingId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildingData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update building');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// DELETE a building
const deleteBuilding = (buildingId) => {
  const url = `${endpoint}/buildings/${buildingId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete building');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// SEARCH buildings
const searchBuildings = (query) => {
  const url = `${endpoint}/search?query=${query}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export {
  getAllBuildings, getBuildingById, createBuilding, updateBuilding, deleteBuilding, searchBuildings,
};
