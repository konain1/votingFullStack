import React, { useState } from 'react';
import ProfileDetails from './ProfileDetails';

function Profile(props) {
  const [activeTab, setActiveTab] = useState('Profile');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className='flex flex-col relative bg-[purple] h-[100vh]'>

        <div className='circle absolute top-[35%] w-[100px] h-[100px] bg-black border rounded-full left-[5%]'></div>

        <div className='upper h-[40%] bg-[black] items-center'></div>

        <div className='lower h-[60%] bg-white'>
          <div className='sm:px-20 text-black  flex-col sm:py-14 justify-center items-center'>
            <h1 className='sm:text-[30px] sm:mt-5 mt-20  mx-10 sm:mx-2  w-[300px] text-[25px] '>{props.user?.name}</h1>
            <p className='sm:text-[10px] mx-2 sm:block hidden w-80 text-[#282626]'>
              Upgrade your Account to receive price and volume alerts on your phone.
            </p>
          </div>

          <div className='border text-white flex justify-between mt-4'>

            <div className='flex justify-evenly sm:w-[50%] w-[100vw] cursor-pointer text-[#767171]'>
              <h4
                className={`px-2 ${activeTab === 'Profile' ? 'border-b-2 border-b-black text-slate-950 font-extrabold' : ''}`}
                onClick={() => handleTabClick('Profile')}
              >
             
                Profile
              </h4>
              <h4
                className={`px-2 ${activeTab === 'About' ? 'border-b-2 border-b-black  text-slate-950 font-extrabold' : ''}`}
                onClick={() => handleTabClick('About')}
              >
                About
              </h4>
              <h4
                className={`px-2 ${activeTab === 'Candidates' ? 'border-b-2 border-b-black  text-slate-950 font-extrabold' : ''}`}
                onClick={() => handleTabClick('Candidates')}
              >
                Candidates
              </h4>
              <h4
                className={`px-2 ${activeTab === 'Contacts' ? 'border-b-2 border-b-black  text-slate-950 font-extrabold' : ''}`}
                onClick={() => handleTabClick('Contacts')}
              >
                Contacts
              </h4>
            </div>
            <div>
            </div>

           
          </div>
          <div className=' block h-[100%]'>
            {activeTab == 'Profile' ? <ProfileDetails user={props?.user}/> : ''}

            </div>
        </div>

      </div>
    </>
  );
}

export default Profile;
