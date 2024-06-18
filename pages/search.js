import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { searchBuildings, deleteBuilding } from '../api/BuildingData';
import BuildingCard from '../components/BuildingCard';
import Footer from './footer';

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleViewMore = (buildingId) => {
    router.push(`/buildings/${buildingId}`);
  };

  const handleEdit = (buildingId) => {
    router.push(`/buildings/edit/${buildingId}`);
  };

  const handleDelete = (buildingId) => {
    console.warn(`Delete building ID: ${buildingId}`);
    deleteBuilding(buildingId).then(() => {
      setResults(results.filter((building) => building.buildingId !== buildingId));
    }).catch((error) => {
      console.error('Failed to delete building:', error);
    });
  };

  useEffect(() => {
    if (query) {
      searchBuildings(query)
        .then((response) => {
          setResults(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setLoading(false);
        });
    }
  }, [query]);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="header"><br />
      <h4>&nbsp; Search Results for &quot;{query}&quot;</h4><br />
      <div id="searchresults">
        {Array.isArray(results) && results.length > 0 ? (
          results.map((building) => (
            <BuildingCard
              key={building.buildingId}
              building={building}
              onViewMore={() => handleViewMore(building.buildingId)}
              onEdit={() => handleEdit(building.buildingId)}
              onDelete={() => handleDelete(building.buildingId)}
            />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
