// src/App.jsx

import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RestaurantPage from './pages/RestaurantPage';
import CreateRestaurantPage from './pages/CreateRestaurantPage';
import ManageMenuPage from './pages/ManageMenuPage';
import Navbar from './components/Navbar';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/restaurants" element={isAuthenticated ? <RestaurantPage /> : <Navigate to="/login" />} />
        <Route path="/restaurants/create" element={isAuthenticated ? <CreateRestaurantPage /> : <Navigate to="/login" />} />
        <Route path="/restaurants/:restaurantId/menu" element={isAuthenticated ? <ManageMenuPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown route to Home */}
      </Routes>
    </div>
  );
}

export default App;
