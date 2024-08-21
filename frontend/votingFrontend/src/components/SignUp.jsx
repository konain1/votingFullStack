import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [otp, setOtp] = useState('');
  const [isVoted, setIsVoted] = useState(false);
  const [role, setRole] = useState('voter');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/v1/users');
        if (response.status === 200) {
          setAllUsers(response.data.users);
        } else {
          console.error('Failed to fetch users, status code:', response.status);
        }
      } catch (error) {
        console.error('An error occurred while fetching users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check if the email or phone already exists
    const existingUser = allUsers.find(
      (user) => user.email === email || user.phone === phone
    );

    if (existingUser) {
      if (existingUser.email === email) {
        setError('Email already exists. Please choose another email.');
      } else if (existingUser.phone === phone) {
        setError('Phone number already exists. Please choose another phone number.');
      }
      return;
    }

    // Check if an admin already exists in the database
    if (role === 'admin') {
      const existingAdmin = allUsers.find((user) => user.role === 'admin');
      if (existingAdmin) {
        setError('An admin account already exists. Only one admin is allowed.');
        return;
      }
    }

    // Proceed with creating the account if validation passes
    try {
      const response = await axios.post('http://localhost:4001/api/v1/register', {
        name,
        email,
        password,
        phone,
        age,
        isVoted,
        role
      });

      if (response.status === 200) {
        setSuccess('Account created successfully! Please log in.');
        setError(''); // Clear any previous error
        navigate('/login'); // Optionally, redirect to the login page
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">OTP:</label>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Not allowed"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
              required
            />
          </div>

          {/* Role Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="voter">Voter</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Is Voted Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Has Voted:</label>
            <select
              value={isVoted}
              onChange={(e) => setIsVoted(e.target.value === 'true')}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
          >
            Create Account
          </button>
        </form>
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
};

export default SignUp;
