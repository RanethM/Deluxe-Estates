// Navigation Bar Component
// Displays logo, site title, and navigation links across all pages
import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

// Top navigation with branding and page links
export default function Navbar() {
  return (
    <header className='header'>
      <div className="header-box">

        {/* Logo and branding */}
        <Link to='/HomePage' className='link-list'>
        <div className='logo-container'>
          <img src='./webLogo.png' alt='Deluxe Estates Logo' className='web-logo' />
          <h1 className='header-logo'>
            <span className='header-logo-first'>Deluxe</span>
            <span className='header-logo-second'>Estates</span>
          </h1>
        </div>
        </Link>

        <ul className="header-list">
          <Link to='/HomePage' className='link-list'><li className="header-list-item">Home</li></Link>
          <Link to='/search' className='link-list'><li className="header-list-item">Properties</li></Link>
          <Link to='/about' className='link-list'><li className="header-list-item">About Us</li></Link>
          <Link to='/contact' className='link-list'><li className="header-list-item">Contact Us</li></Link>
        </ul>

      </div>
    </header>

  )
}