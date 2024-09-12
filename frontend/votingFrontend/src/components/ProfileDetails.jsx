import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faPhone,faUnlockKeyhole,faUserTie } from '@fortawesome/free-solid-svg-icons'; // Import from solid icons
import { useNavigate } from 'react-router-dom';

function ProfileDetails(props) {

   const navigate = useNavigate();
   const HandleChangePassword = ()=>{

    navigate('/changepassword')
   }

  return (
    <>
      <div className='my-10 sm:flex-col sm:mx-5'>

        <div className='sm:flex-col'>
          <h2 className='sm:text-[25px] sm:p-5 sm:border sm:flex rounded border-gray-400'>
            <span className='mx-10'><FontAwesomeIcon icon={faUser} /></span>
            <span className='sm:border border-gray-400 px-10 rounded-lg hover:bg-black hover:text-white'>{props.user?.name}</span> 
          </h2>
          <h2 className='sm:text-[25px] sm:p-5 sm:border sm:flex rounded border-gray-400'>
            <span className='mx-10'><FontAwesomeIcon icon={faEnvelope} /></span>
            <span className='sm:border border-gray-400 px-10 rounded-lg hover:bg-black hover:text-white'>{props.user?.email}</span> 
          </h2>
        </div>

        <div className='sm:flex-col'>
          <h2 className='sm:text-[25px] sm:p-5 sm:border sm:flex rounded border-gray-400 '>
            <span className='mx-10'><FontAwesomeIcon icon={ faUserTie} /></span>
            <span className='sm:border border-gray-400 px-10 rounded-lg hover:bg-black hover:text-white'>{props.user?.role}</span> 
          </h2>
          <h2 className='sm:text-[25px] sm:p-5 sm:border sm:flex rounded border-gray-400'>
            <span className='mx-10'><FontAwesomeIcon icon={faPhone} /></span>
            <span className='sm:border border-gray-400 px-10 rounded-lg hover:bg-black hover:text-white'>{props.user?.phone}</span> 
          </h2>

          <h2 className='sm:text-[25px] sm:p-5 sm:border sm:flex rounded border-gray-400'>
            <span className='mx-10'> <FontAwesomeIcon icon={ faUnlockKeyhole} /></span>
            <span className='sm:border border-gray-400 px-10 rounded-lg cursor-pointer hover:bg-black hover:text-white' onClick={HandleChangePassword}>Change Password</span> 
          </h2>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
