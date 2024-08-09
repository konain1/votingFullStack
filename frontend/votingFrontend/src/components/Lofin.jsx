import React from 'react'
import { useState } from 'react'
import axios from 'axios';
function Lofin() {

    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [user,setUser] = useState(null)



   async function fetchingOnline(event){
        event.preventDefault()
        try {
            
            let response = await axios.post('http://localhost:4001/login',{
                phone,password
            })
            
            setUser(response.data.userInfo)
            console.log(response)
            
        } catch (error) {
            throw new Error("something ...")
        }

    }


  return (


  
    <div>

        <form onSubmit={fetchingOnline} className='border border-[green]'>

            <p>phone</p>
            <input type='text ' className='bg-[green]' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            <br></br>
            <p>phone</p>
            <input type='password' className='bg-[green]' value={password} onChange={(e)=>setPassword(e.target.value)} />
    <br></br>
    <button 
          type="submit" 
          className='bg-blue-500 text-white py-2 px-5 rounded-md w-full sm:w-auto'
        >
          Login
          </button>

        </form>

        <div>
            <p className='text-black'>{user?.name}</p>
        </div>
        


    </div>
  )
}

export default Lofin