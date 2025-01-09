import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RestaurantPage from './pages/RestaurantPage';
import CreateRestaurantPage from './pages/CreateRestaurantPage';
import ManageMenuPage from './pages/ManageMenuPage';
import CreateReservationPage from './pages/CreateReservationPage'; // New page for creating reservations
import UserReservationsPage from './pages/UserReservationsPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; // New Sidebar component
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-100"> {/* Use Tailwind for styling */}
      <Sidebar /> 
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/restaurants" element={isAuthenticated ? <RestaurantPage /> : <Navigate to="/login" />} />
            <Route path="/restaurants/create" element={isAuthenticated ? <CreateRestaurantPage /> : <Navigate to="/login" />} />
            <Route path="/restaurants/:restaurantId/menu" element={isAuthenticated ? <ManageMenuPage /> : <Navigate to="/login" />} />
            <Route path="/reservations/create" element={isAuthenticated ? <CreateReservationPage /> : <Navigate to="/login" />} /> {/* New Route */}
            <Route path="/reservations" element={isAuthenticated ? <UserReservationsPage /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
