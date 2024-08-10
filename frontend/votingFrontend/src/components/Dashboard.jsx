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
    <div>
    
      {error && <p className='text-red-500'>{error}</p>}
      {user  ? (
        <div className='bg-[#0c0601] px-0 h-[70vh] sm:h-[55vh] text-white relative hidden sm:block'>
          {/* User Greeting Section */}
          <div className='flex flex-col items-center h-[100vh] sm:h-auto sm:items-center sm:flex-row sm:justify-around py-10 px-20'>

            {/* User Information Section */}
            <div className='sm:flex-col sm:relative absolute left-4 h-[100%] gap-5'>
              <h1 className='sm:text-[50px] ext-[18px]'>{user.name}</h1>
              <h4 className='sm:text-[20px] ext-[10px]'>Welcome back!</h4>
              <p className='sm:text-[12px] sm:block hidden'>Upgrade your Account to receive <br/> price and volume alerts on your phone</p>
            </div>
            
            {/* Balance and Details Section */}
            <div className='sm:flex sm:justify-around h-[30vh] w-[100vw] sm:w-auto sm:h-auto  justify-center gap-2 flex'>
              <div className='text-[10px] flex flex-col sm:p-10 sm:gap-5 justify-between'>
                <div>
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

              <div className='text-[10px] flex flex-col sm:p-10 gap-5 justify-between'>
                <div>
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
            </div>
          
            {/* Chart Section */}
            <div className='h-[200px] w-[200px] sm:h-[400px] sm:w-[400px]'>
              <Chart />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
 
      <Profile/>
    </>
  );
}

export default Dashboard;
