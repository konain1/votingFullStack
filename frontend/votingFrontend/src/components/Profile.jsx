import React, { useEffect, useState } from 'react';
import ProfileDetails from './ProfileDetails';
import axios from 'axios';
import Contacts from './Contacts';
import Candidate from './Candidate';
import EditProfile from '../EditProfile';

function Profile(props) {
  const [activeTab, setActiveTab] = useState('Profile');
  const [candidate, setCandidate] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(props.user);

  useEffect(() => {
    if (activeTab === 'Profile') {
      handleCurrentUser(); // Fetch the updated user data when switching to Profile tab
    }
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleFetchContacts = async () => {
    try {
      let response = await axios.get('http://localhost:4001/api/v1/users', {
        headers: { 'Content-type': 'application/json' },
      });

      if (response.status === 200) {
        setContacts(response.data.users);
      }
    } catch (error) {
      console.log(error);
      throw new Error('Not able to fetch data');
    }
  };

  const handleCurrentUser = async () => {
    let token = localStorage.getItem('token');
    try {
      let response = await axios.get('http://localhost:4001/api/v1/currentUser', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setCurrentUser(response.data.CurrentUser);
      }
    } catch (error) {
      console.log(error);
      throw new Error('Not able to fetch data');
    }
  };

  const handlefetchCandidates = async () => {
    try {
      let response = await axios.get('http://localhost:4001/candidate/api/v1/candidates', {
        headers: { 'Content-type': 'application/json' },
      });

      if (response.status === 200) {
        setCandidate(response.data.candidates);
      }
    } catch (error) {
      console.log(error);
      throw new Error('Not able to fetch data');
    }
  };

  return (
    <>
      <div className="flex flex-col relative bg-[purple] h-[100vh]">
        <div className="circle absolute top-[35%] w-[100px] h-[100px] bg-black border rounded-full left-[5%]"></div>

        <div className="upper h-[40%] bg-[black] items-center"></div>

        <div className="lower h-[60%] bg-white">
          <div className="sm:px-20 text-black flex-col sm:py-14 justify-center items-center">
            <h1 className="sm:text-[30px] sm:mt-5 mt-20 mx-10 sm:mx-2 w-[300px] text-[25px] ">
              {currentUser?.name}
            </h1>
            <p className="sm:text-[10px] mx-2 sm:block hidden w-80 text-[#282626]">
              Upgrade your Account to receive price and volume alerts on your phone.
            </p>
          </div>

          <div className="border text-white flex justify-between mt-4">
            <div className="flex justify-evenly sm:w-[50%] w-[100vw] cursor-pointer text-[#767171]">
              <h4
                className={`px-2 ${
                  activeTab === 'Profile'
                    ? 'border-b-2 border-b-black text-slate-950 font-extrabold'
                    : ''
                }`}
                onClick={() => handleTabClick('Profile')}
              >
                Profile
              </h4>
              <h4
                className={`px-2 ${
                  activeTab === 'EditProfile'
                    ? 'border-b-2 border-b-black text-slate-950 font-extrabold'
                    : ''
                }`}
                onClick={() => {
                  handleTabClick('EditProfile');
                  handleCurrentUser();
                }}
              >
                EditProfile
              </h4>
              <h4
                className={`px-2 ${
                  activeTab === 'Candidates'
                    ? 'border-b-2 border-b-black text-slate-950 font-extrabold'
                    : ''
                }`}
                onClick={() => {
                  handleTabClick('Candidates');
                  handlefetchCandidates();
                }}
              >
                Candidates
              </h4>
              <h4
                className={`px-2 ${
                  activeTab === 'Contacts'
                    ? 'border-b-2 border-b-black text-slate-950 font-extrabold'
                    : ''
                }`}
                onClick={() => {
                  handleTabClick('Contacts');
                  handleFetchContacts();
                }}
              >
                Contacts
              </h4>
            </div>
          </div>
          <div className="block h-[100%]">
            {activeTab === 'Profile' && <ProfileDetails user={currentUser} />}
            {activeTab === 'Candidates' && (
              <Candidate handlefetchCandidates={handlefetchCandidates} data={candidate} />
            )}
            {activeTab === 'Contacts' && <Contacts users={contacts} />}
            {activeTab === 'EditProfile' && (
              <EditProfile handleCurrentUser={handleCurrentUser} CurrentUser={currentUser} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
