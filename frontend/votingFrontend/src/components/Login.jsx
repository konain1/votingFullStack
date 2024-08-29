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
  
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userInfo._id); 
        localStorage.setItem('loginUser', JSON.stringify(response.data.userInfo));
  
        navigate('/dashboard'); 
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Login failed: ' + error.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="login wrap bg-[#2c2c2c] text-white p-[47px] pt-[30px] pb-[57px] rounded-[17px] max-w-xs mx-auto">
        <div className="h1 text-center text-[1.3em]">Login</div>
        <form onSubmit={fetchLogin}>
          <input 
            type="text" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full p-[13px] mt-[20px] rounded-full bg-[#3c3c3c] text-white text-[0.8em] focus:outline-none focus:animate-bounce"
            placeholder="Phone" 
          />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-[13px] mt-[20px] rounded-full bg-[#3c3c3c] text-white text-[0.8em] focus:outline-none focus:animate-bounce1"
            placeholder="Password" 
          />
          {error && <p className="text-red-500 mt-[20px]">{error}</p>}
          <input 
            type="submit" 
            value="Login"
            className="btn mt-[40px] w-full p-[13px] rounded-full font-semibold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white cursor-pointer transition-all duration-400 ease-in-out hover:bg-[#1e1e1e]"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
