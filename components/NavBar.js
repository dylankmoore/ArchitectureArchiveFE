/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    setSearchTerm('');
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?query=${searchTerm}`);
    }
  };

  const handleFocus = (e) => {
    e.target.style.boxShadow = 'none';
  };

  const handleBlur = (e) => {
    e.target.style.outline = 'none';
    e.target.style.boxShadow = 'none';
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navi">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img src="/aalogo.png" alt="logo" className="nav-logo me-3" width="200" height="90" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link passHref href="/">
              <Nav.Link>HOME</Nav.Link>
            </Link>&nbsp;
            <Link passHref href="/buildings">
              <Nav.Link>VIEW ARCHIVE</Nav.Link>
            </Link>&nbsp;
            <Link passHref href="/buildings/new">
              <Nav.Link>CREATE ENTRY</Nav.Link>
            </Link>&nbsp;
            <Link passHref href="/collections">
              <Nav.Link>COLLECTIONS</Nav.Link>
            </Link>&nbsp;
          </Nav>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button
            type="button"
            onClick={signOut}
            className="btn btn-link"
            style={{ paddingLeft: '80px', paddingRight: '0px' }}
          >
            <img
              src="/AASIGNOUT.png"
              alt="signout"
              className="nav-logo"
              width="140"
              height="30"
              style={{ cursor: 'pointer' }}
            />
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
