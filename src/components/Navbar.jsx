import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav  style={styles.navbar}>
      <div style={styles.navbarBrand}>
        <Link to="/" style={styles.link}>Dine On Time</Link>
      </div>
      <div style={styles.navLinks}>
        {isAuthenticated ? (
          <>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <Link to="/restaurants" style={styles.link}>Restaurants</Link>
            <Link to="/restaurants/create" style={styles.link}>Create Restaurant</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" style={styles.link}>Register</Link>
            <Link to="/login" style={styles.link}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  navbarBrand: {
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '15px',
  },
  button: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    cursor: 'pointer',
    fontSize: '1em',
  },
};

export default Navbar;
