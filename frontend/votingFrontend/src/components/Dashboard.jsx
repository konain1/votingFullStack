import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashNav from './DashNav';
import Chart from './charts/Chart';
import Profile from './Profile';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/DashboarduserSlice';
import getCandidate from '../redux/CandidateThunk';

function Dashboard() {
  // const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCandidate())

    
  },[dispatch])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    async function fetchUser() {
      try {
        const response = await axios.get('http://localhost:4001/api/v1/currentUser', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log(response.data.CurrentUser)
        // setUser(response.data.CurrentUser);
        dispatch(loginUser(response.data.CurrentUser))
        
      } catch (error) {
        setError('Failed to fetch user data');
        navigate('/login');
      }
    }

    fetchUser();
  }, [navigate]);

  return (
    <>
    
      
 
      <Profile />
    </>
  );
}

export default Dashboard;
