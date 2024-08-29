// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 className='text-red-500'>Welcome to Dine On Time</h1>
      <p>Your ultimate solution for managing restaurant reservations and menus.</p>
      
      <div style={{ marginTop: '20px' }}>
        <Link to="/register" style={{ marginRight: '15px' }}>
          <button>Register</button>
        </Link>
        <Link to="/login" style={{ marginRight: '15px' }}>
          <button>Login</button>
        </Link>
        <Link to="/restaurants">
          <button>View Restaurants</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
