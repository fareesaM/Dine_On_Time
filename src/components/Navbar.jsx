import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // Make sure to import your CSS file

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo">Dine On Time</Link>
      </div>
      <div className="search-container">
        <div className="location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
          <span>Bengaluru</span>
          <FontAwesomeIcon icon={faCaretDown} className="dropdown-arrow" />
        </div>
        <input type="text" placeholder="Search for restaurant, cuisine or a dish" className="search-input" />
      </div>
      <ul className="navbar-links">
        {isAuthenticated ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/restaurants">Restaurants</Link></li>
            <li><Link to="/restaurants/create">Create Restaurant</Link></li>
            <li><button onClick={handleLogout} className="navbar-button">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
