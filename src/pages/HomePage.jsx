import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://fsd-dot-bknd.onrender.com/api/restaurants');
        setRestaurants(response.data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to fetch restaurants. Please try again.');
      }
    };

    fetchRestaurants();
  }, []);

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
      
      <div style={{ marginTop: '20px' }}>
        <h2 className='text-blue-500'>Restaurants</h2>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant._id}>{restaurant.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomePage;
