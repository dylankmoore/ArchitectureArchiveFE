import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, Button } from 'react-bootstrap';

export default function SearchBar({
  searchTerm, onSearchChange, onSearchSubmit, onFocus, onBlur,
}) {
  return (
    <Form className="d-flex" onSubmit={onSearchSubmit}>
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={onSearchChange}
        style={{
          border: '1px solid black',
          marginRight: '10px',
          outlineColor: 'black',
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Button variant="secondary" type="submit" style={{ padding: '0 10px' }}>Search</Button>
    </Form>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
