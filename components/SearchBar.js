// components/SearchBar.js
import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl } from 'react-bootstrap';

export default function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value.toLowerCase());
  };

  return (
    <Form className="d-flex text" style={{ width: '60%', margin: '0 auto', height: '50px' }}>
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        name="search"
        onChange={handleChange}
      />
    </Form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
