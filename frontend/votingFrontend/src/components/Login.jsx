import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function fetchLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/login', {
        phone,
        password
      });
  
      console.log("useree",response.data.userInfo);
  
      if (response.data.token) {
        // Store the token and userId in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userInfo._id); // Assuming user ID is returned as user._id
        localStorage.setItem('loginUser', JSON.stringify(response.data.userInfo)); // Stringify the user object
  
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Login failed: ' + error.message);
    }
  }
  

  return (
    <div className='overflow-hidden p-4'>
      <form 
        className='border border-black p-7 max-w-md mx-auto bg-[orange] rounded-md'
        onSubmit={fetchLogin}
      >
        <div className='mb-4'>
          <label className='block text-lg font-medium mb-2'>Phone :</label>
          <input 
            type="text" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='bg-green-500 text-white p-2 rounded-md w-full sm:w-auto placeholder-white' 
            placeholder='Phone' 
          />
        </div>
        <div className='mb-4'>
          <label className='block text-lg font-medium mb-2'>Password :</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-green-500 text-white p-2 rounded-md w-full sm:w-auto placeholder-white' 
            placeholder='Password' 
          />
        </div>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <button 
          type="submit" 
          className='bg-blue-500 text-white py-2 px-5 rounded-md w-full sm:w-auto'
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
