import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Dash from './components/Dash';
import DashNav from './components/DashNav';
import ChangePassword from './components/ChangePassword';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import Candidate from './components/Candidate';


function App() {
  return (

    <>

    
    <Router>
    {/* <DashNav/> */}

      <Routes>
     
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/dash' element={<Dash/>} />
        <Route path='/changepassword' element={<ChangePassword/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/profiledetails' element={<ProfileDetails/>} />
        <Route path='/candidate' element={<Candidate/>} />


        {/* Add other routes here */}
      </Routes>
    </Router>
    </>
  );
}

export default App
