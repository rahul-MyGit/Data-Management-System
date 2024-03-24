import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <h2>Welcome to Data Store</h2>
    <nav>
      <ul>
        <li>
          <Link to="/list">All List Of data</Link>
        </li>
        <li>
          <Link to="/add">Add User to data</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default NavBar;