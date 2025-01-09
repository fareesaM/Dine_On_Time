import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/restaurants/myrestaurants', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched restaurants:', response.data); // Log the fetched data
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/restaurants/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
      alert('Restaurant deleted successfully');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleManageMenu = (restaurantId) => {
    navigate(`/restaurants/${restaurantId}/menu`);
  };

  return (
    <div>
      <h1>My Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.description}</p>
            {restaurant.imageUrl && (
              <img src={restaurant.imageUrl} alt={restaurant.name} style={{ width: '200px', height: '150px' }} />
            )}
            <button onClick={() => handleManageMenu(restaurant._id)}>Manage Menu</button>
            <button onClick={() => handleDelete(restaurant._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantPage;
