import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/users">Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/orderPage">Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
