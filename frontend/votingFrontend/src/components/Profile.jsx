import React from 'react'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        // if (!token) {
        //   navigate('/login');
        //   return;
        // }
    
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
      }, []);
  return (
    
    <>
        <div className='flex flex-col relative bg-[purple] h-[100vh]'>

        <div className='circle absolute top-[35%] w-[100px] h-[100px] bg-black border rounded-full left-[5%]'></div>

        <div className='upper h-[40%] bg-[black] items-center'>

        </div>
        <div className='lower h-[60%] bg-[#528a52]  '>

            <div className='sm:px-20  text-black flex-col sm:py-14  justify-center items-center '>
              <h1 className='sm:text-[30px] m-10 sm:m-auto text-[25px] py-5'>{user?.name}</h1>
              <p className='sm:text-[10px] sm:block hidden w-80 text-[#282626]'>Upgrade your Account to receive  price and volume alerts on your phone
              Upgrade your Account to receive  price and volume alerts on your phone
              Upgrade your Account to receive  price and volume alerts on your phone</p>
           
            </div>
            <div className='border text-white flex justify-between'>
            <div className='flex justify-evenly w-[50%]'>
            <h4>Profile</h4>
                <h4>Profile</h4>
                <h4>about</h4>
                <h4>Candidates</h4>
                <h4>contacts</h4>
            </div>
             
                <div></div>
            </div>

            


         </div>

        </div>
    </>
  )
}

export default Profile