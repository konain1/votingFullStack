import React, { useEffect, useState } from 'react';
import ProfileDetails from './ProfileDetails';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Contacts from './Contacts';
import Candidate from './Candidate';
import EditProfile from '../EditProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCameraRotate } from '@fortawesome/free-solid-svg-icons'; 
import ButtonComponent from './ButtonComponent';
import CandidateCard from './CandidateCard';

function Profile(props) {
  const [activeTab, setActiveTab] = useState('Profile');
  const [candidate, setCandidate] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(props.user);
  const [dpUrl, setDpUrl] = useState();

  const navigate = useNavigate();

  useEffect(() => {
  if (activeTab === 'Profile') {
      handleCurrentUser();
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
        if(response.data.candidates.length == 0){
          ResetUserVotedValue()
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error('Not able to fetch data');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  async function handleDP(event) {
    try {
      let file = event.target.files[0];
      if (!file) return;

      let data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'cloudpreset');
      data.append('cloud_name', 'dleyuli2e');

      let response = await axios.post('https://api.cloudinary.com/v1_1/dleyuli2e/image/upload', data);

      let result = response.data;
      profilePicHandler(result.url);
    } catch (error) {
      console.log('Cloudinary uploading Error', error);
    }
  }

  const profilePicHandler = async (dp) => {
    let token = localStorage.getItem('token');
    try {
      if (!token) return;
      console.log('Display picture', dp);

      let response = await axios.post(
        'http://localhost:4001/api/v1/profilepic',
        { profilePic: dp },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        console.log('Profile picture updated successfully');
        setDpUrl(dp);
      } else {
        console.log('Failed to update profile picture');
      }
    } catch (error) {
      console.log('Error updating profile picture', error);
    }
  };

  async function ResetUserVotedValue() {
    try {
      let response = await axios.post('http://localhost:4001/api/v1/resetUserVoterValue');

      if (response.status === 200) {
        console.log('IsVoted == false set');
      }
    } catch (error) {
      console.log('got error at resetUserVoterValue', error);
    }
  }

  return (
    <>
      <div className="flex flex-col relative bg-[purple] h-[100vh]">
        <div>
          <div className="circle absolute top-[35%] w-[100px] h-[100px] overflow-hidden flex bg-[lightgreen] border rounded-full left-[5%]">
            <img className="h-[100%] w-[100%] rounded-lg" src={`${currentUser?.profileImage}`} alt="Profile" />
          </div>
          <div>
            <div className="absolute flex justify-center items-center overflow-hidden h-[5%] w-[5%] sm:h-[2%] sm:w-[2%] sm:mt-[25%] sm:left-[10%] mt-[82%] left-[27%] rounded-lg">
              <input type="file" name="uploadfile" id="img" style={{ display: 'none' }} onChange={handleDP} />
              <label htmlFor="img">
                <FontAwesomeIcon className="text-[20px] z-index-10" icon={faCameraRotate} />
              </label>
            </div>
          </div>
        </div>

        <div className="upper h-[40%] bg-[black] items-center"></div>

        <div className="lower h-[60%] bg-white">
          <div className="sm:px-20 text-black flex sm:py-14 justify-around items-center">
            <h1 className="sm:text-[30px] sm:mt-5 mt-20 mx-10 sm:mx-2 w-[300px] text-[25px] ">
              {currentUser?.name}
            </h1>

            <ButtonComponent
              className={`font-inherit sm:text-xs text-[12px] bg-gradient-to-b from-red-400 to-red-600 text-white sm:px-5 px-2 sm:py-3 py-1 flex items-center justify-center border-none rounded-full shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl active:transform active:scale-95 active:shadow-md`}
              onClick={handleLogout}
            >
              LogOut
            </ButtonComponent>
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

              <CandidateCard handlefetchCandidates={handlefetchCandidates} data={candidate}/>
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
