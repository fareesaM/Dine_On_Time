import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CreateReservationPage = () => {
  const { token } = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/restaurants', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRestaurants(response.data);
        console.log('Fetched Restaurants:', response.data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to fetch restaurants. Please try again.');
      }
    };
  
    if (token) {
      fetchRestaurants();
    }
  }, [token]);
  
  useEffect(() => {
    console.log('Token:', token);

    const fetchMenuItems = async () => {
      if (!restaurantId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/menu/${restaurantId}/menu`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenuItems(response.data.items);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to fetch menu items. Please try again.');
      }
    };

    fetchMenuItems();
  }, [restaurantId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/reservations',
        {
          restaurantId,
          menuIds: selectedMenuItems.map((item) => item._id),
          date,
          time,
          numberOfGuests,
          specialRequests,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess('Reservation created successfully!');
      console.log('Response:', response.data);
      setRestaurantId('');
      setSelectedMenuItems([]);
      setDate('');
      setTime('');
      setNumberOfGuests('');
      setSpecialRequests('');
      setError('');
    } catch (err) {
      console.error('Error creating reservation:', err);
      setError('Failed to create reservation. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Reservation</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
      <label className="block mb-2">
  Select Restaurant:
  <select
    value={restaurantId}
    onChange={(e) => setRestaurantId(e.target.value)}
    className="block w-full p-2 border rounded mt-1"
    required
  >
    <option value="">Select a restaurant</option>
    {restaurants.length > 0 ? (
      restaurants.map((restaurant) => (
        <option key={restaurant._id} value={restaurant._id}>
          {restaurant.name}
        </option>
      ))
    ) : (
      <option value="">No restaurants available</option>
    )}
  </select>
</label>

        {menuItems.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Menu Items:</h2>
            {menuItems.map((item) => (
              <label key={item._id} className="block">
                <input
                  type="checkbox"
                  value={item._id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMenuItems([...selectedMenuItems, item]);
                    } else {
                      setSelectedMenuItems(
                        selectedMenuItems.filter((selected) => selected._id !== item._id)
                      );
                    }
                  }}
                />
                {item.name} - ${item.price}
              </label>
            ))}
          </div>
        )}
        <label className="block mb-2">
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="block w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Number of Guests:
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            className="block w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Special Requests:
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="block w-full p-2 border rounded mt-1"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Create Reservation
        </button>
      </form>
    </div>
  );
};

export default CreateReservationPage;
