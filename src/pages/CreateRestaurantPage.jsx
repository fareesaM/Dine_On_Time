// src/pages/CreateRestaurantPage.jsx

import React, { useState } from 'react';
import axios from 'axios';

function CreateRestaurantPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newRestaurant = {
      name,
      address,
      phoneNumber,
      email,
      description,
    };
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/restaurants', newRestaurant, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Restaurant created successfully');
      setName('');
      setAddress('');
      setPhoneNumber('');
      setEmail('');
      setDescription('');
      setError('');
    } catch (err) {
      console.error('Error creating restaurant:', err);
      setError('Failed to create restaurant. Please try again.');
    }
  };
  

  return (
    <div>
      <h1>Create Restaurant</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  );
}

export default CreateRestaurantPage;
