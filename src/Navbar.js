// src/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = ({ onSave }) => {
  return (
    <div className="navbar">
      <a href="#" className="logo">
        coEDITOR
      </a>
      <button className="save-button" onClick={onSave}>
        Save
      </button>
    </div>
  );
};

export default Navbar;
