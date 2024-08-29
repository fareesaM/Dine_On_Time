// src/pages/ManageMenuPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ManageMenuPage() {
  const { restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem('token');

        // Debug: Check if the token exists
        if (!token) {
          console.error('No token found in localStorage.');
          return;
        }

        // Debug: Output token value
        console.log(`Token: ${token}`);

        const response = await axios.get(`http://localhost:5000/api/menu/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched menu items:', response.data);
        setMenuItems(response.data.items); // Ensure the response structure matches

      } catch (error) {
        // Log detailed error information
        if (error.response) {
          console.error('Error fetching menu items:', error.response.data);
        } else {
          console.error('Error fetching menu items:', error.message);
        }
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  const handleAddItem = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/restaurants/${restaurantId}/menu`,
        newItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update state with the new list of menu items
      setMenuItems(response.data.items);
      setNewItem({ name: '', price: '' });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleUpdateMenuItem = async (id, updatedItem) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/menu/${restaurantId}/${id}`,
        updatedItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update state with the new list of menu items
      setMenuItems(response.data.items);
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/menu/${restaurantId}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update state by filtering out the deleted item
      setMenuItems(menuItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <div>
      <h1>Manage Menu</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleUpdateMenuItem(item._id, { ...item, name: 'Updated Name' })}>Edit</button>
            <button onClick={() => handleDeleteMenuItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Item</h2>
      <input
        type="text"
        placeholder="Item Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default ManageMenuPage;
