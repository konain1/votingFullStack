import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Dash from './components/Dash';
import DashNav from './components/DashNav';
import ChangePassword from './components/ChangePassword';


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
        {/* Add other routes here */}
      </Routes>
    </Router>
    </>
  );
}

export default App
