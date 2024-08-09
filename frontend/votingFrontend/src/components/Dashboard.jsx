import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashNav from './DashNav';
import { LineChart, Line } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Chart from './charts/Chart';

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
    <div className=''>
    
      {error && <p className='text-red-500'>{error}</p>}
      {user  ? (
        <div className='bg-[#0c0601] px-0 h-[70vh] sm:h-[55vh] text-white relative'>
          {/* <h1 className="text-[30px] p-2">Welcome , {user.name}</h1> */}

          <div className='flex flex-col items-center sm:flex-row sm:justify-around py-10 px-20'>

          <div className=' flex flex-col  h-[100%]  gap-5'>

            <h1 className='sm:text-[50px]'>{user.name}</h1>
            <h4 className='sm:text-[20px]'>Welcome back!</h4>
            <p className='sm:text-[12px]'>Upgrade your Account to recieve <br></br>
            price and volume alert on your phone</p>

          </div>
          <div className='text-[10px] flex flex-col  p-10  gap-5 justify-between'>
            <div className=' '>
              <h4 className='text-[grey]'>USD BALANCE</h4>
              <p>15,008,00</p>
            </div>
            <div>
            <h4 className='text-[grey]'>USD BALANCE</h4>
            <p>15,008,00</p>
            </div>
            <div>
            <h4 className='text-[grey]'>USD BALANCE</h4>
            <p>15,008,00</p>
            </div>
            <div>
            <button className='bg-[green] px-5 py-1'>Details</button>
            </div>
          </div>

          <div className='text-[10px] flex flex-col  p-10  gap-5 justify-between'>
            <div className=' '>
              <h4 className='text-[grey]'>USD BALANCE</h4>
              <p>15,008,00</p>
            </div>
            <div>
            <h4 className='text-[grey]'>USD BALANCE</h4>
            <p>15,008,00</p>
            </div>
            <div>
            <h4 className='text-[grey]'>USD BALANCE</h4>
            <p>15,008,00</p>
            </div>
            <div>
            <button className='bg-[green] px-5 py-1'>Details</button>
            </div>

          

          </div>
          <div className=' h-[400px] w-[400px]'>
         
          <Chart/>
          </div>
          
          
          </div>
          
          
        
        </div>

        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
