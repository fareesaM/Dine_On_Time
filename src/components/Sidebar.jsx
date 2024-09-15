// src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md flex flex-col p-4">
      <div className="text-lg font-bold mb-4">Dine on Time</div>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Dashboard</Link>
        <Link to="/restaurants" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Restaurants</Link>
        <Link to="/restaurants/create" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Create Restaurant</Link>
        <Link to="/profile" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Profile</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
