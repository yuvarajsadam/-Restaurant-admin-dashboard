import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <span className="brand-icon">🍽️</span>
            <h1 className="brand-title">Restaurant Management System</h1>
          </div>
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
