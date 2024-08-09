import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Dash() {

    const [user,setUser] =useState('')

    useEffect(()=>{
        let token = localStorage.getItem('token')

        async function fetching() {

            let response = await axios.get('http://localhost:4001/home', {
                headers: { Authorization: `Bearer ${token}` }
              });
              console.log(response.data.users)
              setUser(response.data.users)
            
        }

        fetching();

    },[])

   




  return (
    <div>
        {user ? (
            <div>{user.name}</div>
        ):''}

        <h1>Dash</h1>
    </div>
  )
}

export default Dash