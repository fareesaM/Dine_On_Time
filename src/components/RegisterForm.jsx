// src/components/RegisterForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('restaurant-owner');  // Default to restaurant-owner
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      role,
    };

    try {
      await axios.post('http://localhost:5000/api/users/register', newUser);
      alert('User registered successfully');
      setName('');
      setEmail('');
      setPassword('');
      setRole('restaurant-owner');
      setError('');
    } catch (err) {
      console.error('Error registering user:', err);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="customer">Customer</option>
          <option value="restaurant-owner">Restaurant Owner</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
