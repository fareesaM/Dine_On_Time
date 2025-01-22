// src/components/LoginForm.jsx

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://fsd-dot-bknd.onrender.com/api/users/login', { email, password });
      const { token } = response.data;

      // Use the login function from AuthContext to set the token and update state
      login(token);

      // Clear error message and navigate to profile
      setError('');
      navigate('/');

    } catch (err) {
      console.error('Error logging in:', err);
      setError('Invalid credentials. Please try again.');
    }
  };

  // If the user is already authenticated, redirect to the profile page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
