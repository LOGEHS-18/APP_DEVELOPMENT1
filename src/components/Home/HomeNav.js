// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';

const HNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="https://cdn-icons-png.freepik.com/256/3082/3082060.png?semt=ais_hybrid" alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
          TOY-WORLD
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orderPage">Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
          <Link to="/cart" className="me-3">
            <FaShoppingCart size={30} />
          </Link>
            <DropdownButton
              align="end"
              title={<FaUserCircle size={30} />}
              id="dropdown-menu-align-end"
              variant="outline-secondary"
            >
              <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/">Dashboard</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/">LogOut</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HNavbar;
