import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import {  Button } from '@mui/material';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Zoom Clone</div>
      <ul className="navbar__menu">
        {/* <li>
        <Link  className="navbar__item" to="/">Home</Link>
        </li> */}
        {/* <li >
        <Link  className="navbar__item" to="/register">Register</Link>
        </li> */}
        <li >
        <Button variant="contained" color="secondary">
        <Link  className="navbar__item"  to="/login">Login</Link>
    </Button>
        
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
