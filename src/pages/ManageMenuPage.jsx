import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ManageMenuPage() {
  const { restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '' });
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found in localStorage.');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/menu/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched menu items:', response.data);
        setMenuItems(response.data.items);

      } catch (error) {
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
      const formData = new FormData();
      formData.append('name', newItem.name);
      formData.append('price', newItem.price);
      formData.append('description', newItem.description);
      formData.append('image', newImage);
  
      const response = await axios.post(
        `http://localhost:5000/api/restaurants/${restaurantId}/menu`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Log the response data to ensure imageUrl is present
      console.log('Added menu item response:', response.data);
      setMenuItems(response.data.items);
      setNewItem({ name: '', price: '', description: '' });
      setNewImage(null);
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };
  
  useEffect(() => {
    console.log('Menu items state:', menuItems); // Log the menu items state
  }, [menuItems]);
  
  

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

      // Log the response data to ensure imageUrl is present
      console.log('Updated menu item:', response.data);
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
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px' }} />
            ) : (
              <p>No image available</p>
            )}
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
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setNewImage(e.target.files[0])}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default ManageMenuPage;
