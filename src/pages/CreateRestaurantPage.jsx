// // src/pages/CreateRestaurantPage.jsx

// import React, { useState } from 'react';
// import axios from 'axios';

// function CreateRestaurantPage() {
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [description, setDescription] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const newRestaurant = {
//       name,
//       address,
//       phoneNumber,
//       email,
//       description,
//     };
  
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('http://localhost:5000/api/restaurants', newRestaurant, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert('Restaurant created successfully');
//       setName('');
//       setAddress('');
//       setPhoneNumber('');
//       setEmail('');
//       setDescription('');
//       setError('');
//     } catch (err) {
//       console.error('Error creating restaurant:', err);
//       setError('Failed to create restaurant. Please try again.');
//     }
//   };
  

//   return (
//     <div>
//       <h1>Create Restaurant</h1>
//       <form onSubmit={handleSubmit}>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <div>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <div>
//           <label>Address:</label>
//           <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
//         </div>
//         <button type="submit">Create Restaurant</button>
//       </form>
//     </div>
//   );
// }

// export default CreateRestaurantPage;

import React, { useState } from 'react';
import axios from 'axios';

function CreateRestaurantPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    formData.append('description', description);
    if (image) {
      formData.append('image', image); // Add the selected image
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/restaurants', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Specify the content type
        },
      });
      setSuccess('Restaurant created successfully!');
      setError('');
      // Clear form fields
      setName('');
      setAddress('');
      setPhoneNumber('');
      setEmail('');
      setDescription('');
      setImage(null);
    } catch (err) {
      console.error('Error creating restaurant:', err);
      setError('Failed to create restaurant. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Create Restaurant</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Restaurant Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Restaurant
        </button>
      </form>
    </div>
  );
}

export default CreateRestaurantPage;
