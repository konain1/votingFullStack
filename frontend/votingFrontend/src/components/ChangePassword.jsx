import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChangePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const handleChangePasswordFetch = async()=>{

    let token = localStorage.getItem('token')


    if (!password || !confirmPassword) {
        alert("Please fill in both fields.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
    
    try {
        const response = await axios.put(
          'http://localhost:4001/password',
          { password }, // Pass the new password in the request body
          {
            headers: { Authorization: `Bearer ${token}` }
          }

        );
  
        if (response.status === 200) {
          alert('Password updated successfully.');
          navigate('/dashboard'); // Redirect to ProfileDetails component
        }
      } catch (error) {
        console.error("Error updating password:", error);
        alert('Failed to update password. Please try again later.');
      }
    };

  

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Logic to evaluate password strength
    if (value.length < 8) {
      setPasswordStrength('Weak');
    } else if (/[A-Z]/.test(value) && /[0-9]/.test(value) && /[a-z]/.test(value)) {
      setPasswordStrength('Strong');
    } else {
      setPasswordStrength('Medium');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <button 
          onClick={handleBackClick} 
          className="mb-4 text-blue-500 hover:underline"
        >
          &larr; Back to Profile
        </button>
        <div className="flex justify-center mb-6">
          <span className="text-4xl">🔒</span>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">Password Reset</h2>
        <p className="text-center text-gray-500 mb-8">Enter new password and then repeat it</p>
        
        <div className="mb-4">
          <label className="block text-gray-700">New password</label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="absolute top-1/2 transform -translate-y-1/2 left-3">
              <span className="text-gray-400">🔒</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Repeat Password</label>
          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="absolute top-1/2 transform -translate-y-1/2 left-3">
              <span className="text-gray-400">🔒</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          <span>Password strength: </span>
          <span className={`font-bold ${passwordStrength === 'Strong' ? 'text-green-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
            {passwordStrength}
          </span>
        </div>

        <button onClick={handleChangePasswordFetch} className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
          Save
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
