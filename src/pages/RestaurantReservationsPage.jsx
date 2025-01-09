import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CreateReservationPage = () => {
  const { token } = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [menuIds, setMenuIds] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        const response = await axios.get('http://localhost:5000/api/restaurants', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setError('Failed to fetch restaurants. Please try again.');
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReservation = {
      restaurantId,
      menuIds,
      date,
      time,
      numberOfGuests,
      specialRequests,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/reservations', newReservation, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Reservation created successfully');
      setRestaurantId('');
      setMenuIds([]);
      setDate('');
      setTime('');
      setNumberOfGuests('');
      setSpecialRequests('');
      setError('');
    } catch (err) {
      console.error('Error creating reservation:', err);
      setError('Failed to create reservation. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Reservation</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Restaurant:
            <select
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
              className="block w-full p-2 border rounded mt-1"
              required
            >
              <option value="">Select a restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            Menu IDs (comma separated):
            <input
              type="text"
              value={menuIds}
              onChange={(e) => setMenuIds(e.target.value.split(','))}
              className="block w-full p-2 border rounded mt-1"
              required
            />
          </label>
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
      )}
    </div>
  );
};

export default CreateReservationPage;
