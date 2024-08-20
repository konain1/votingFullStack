import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfile({ CurrentUser }) {
  const [name, setName] = useState(CurrentUser?.name || '');
  const [email, setEmail] = useState(CurrentUser?.email || '');
  const [phone, setPhone] = useState(CurrentUser?.phone || '');
  const [age, setAge] = useState(CurrentUser?.age || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleUpdates = async (e) => {
    e.preventDefault();

    // Construct the updatedData object only with fields that are filled
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (phone) updatedData.phone = phone;
    if (age) updatedData.age = age;

    if (Object.keys(updatedData).length === 0) {
      setError('Please update at least one field.');
      return;
    }

    setError(''); // Clear error message if validation passes

    const token = localStorage.getItem('token');

    try {
      const response = await axios.put('http://localhost:4001/api/v1/userUpdate', updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setSuccess('User data updated successfully');
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError('Error updating user data.');
        console.error('Error updating user data:', response.data);
      }
    } catch (error) {
      setError('An error occurred while updating the profile.');
      console.error('Error updating user data:', error);
    }
  };

  return (

    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleUpdates}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update Profile
            </button>
          </div>
          {/* <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="text-blue-500 hover:underline"
            >
              Back to Dashboard
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
