// src/pages/MyReservationsPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function MyReservationsPage() {
  const { token } = useContext(AuthContext); // Get the token from the context
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations/myreservations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservations(response.data);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        if (err.response) {
          setError(err.response.data.message || 'Failed to fetch reservations.');
        } else {
          setError('Network error. Please try again.');
        }
      }
    };

    if (token) {
      fetchReservations();
    }
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-4">My Reservations</h1>
      {error && <p className="text-red-500">{error}</p>}
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id} className="mb-4 border p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold">Restaurant: {reservation.restaurant.name}</h2>
              <p><strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {reservation.time}</p>
              <p><strong>Guests:</strong> {reservation.numberOfGuests}</p>
              <p><strong>Special Requests:</strong> {reservation.specialRequests || 'None'}</p>
              <p><strong>Status:</strong> {reservation.status}</p>
              <hr className="my-2" />
              <p className="text-gray-500 text-sm">
                Reserved on {new Date(reservation.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You have no reservations.</p>
      )}
    </div>
  );
}

export default MyReservationsPage;
