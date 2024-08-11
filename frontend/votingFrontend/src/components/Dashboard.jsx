import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashNav from './DashNav';
import Chart from './charts/Chart';
import Profile from './Profile';
function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    async function fetchUser() {
      try {
        const response = await axios.get('http://localhost:4001/home', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUser(response.data.users);
      } catch (error) {
        setError('Failed to fetch user data');
        navigate('/login');
      }
    }

    fetchUser();
  }, [navigate]);

  return (
    <>
    
      
 
      <Profile user={user}/>
    </>
  );
}

export default Dashboard;
