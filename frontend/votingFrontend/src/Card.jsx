import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Card (props) {
  const [flag, setFlag] = useState(false)
  const [party, setParty] = useState('')
  const [name,setName] = useState(props.name)
  const [ email,setEmail] = useState(props.email)
  const [age,setAge] = useState(props.age)

  const User = useSelector(state => state.UserStore.User)


  const data = { email, name, party, age };

  
  const handleParty = e => {
    setParty(e.target.value)
  }
  const handleConfirm = ()=>{
    createNominees()
  }


  async function createNominees() {

    let token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:4001/candidate/api/v1/create',
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.status)
      if (response.status === 201) {
        console.log('Candidate created successfully');
        // navigate('/dashboard')
        // handlefetchCandidates()
        // setIsVisible(false)
        setFlag(!flag)
      } else {
        console.error('Error creating candidate', response.data);
       
      }
    } catch (error) {
      console.error('Error creating candidate:', error);
      alert('party or person has already been choosen')
    }
  }

  return (
    <div className='relative w-[300px] h-[384px] flex flex-col items-center rounded-[20px] bg-white shadow-lg'>
      {/* Card Image */}
      <div className='h-[192px] w-full'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-full rounded-t-[20px]'
          width='100%'
        >
          {/* Add your SVG content here */}
          <rect fill='#ffffff' width='540' height='450'></rect>
          <defs>
            <linearGradient
              id='a'
              gradientUnits='userSpaceOnUse'
              x1='0'
              x2='0'
              y1='0'
              y2='100%'
              gradientTransform='rotate(222,648,379)'
            >
              <stop offset='0' stopColor='#ffffff'></stop>
              <stop offset='1' stopColor='#FC726E'></stop>
            </linearGradient>
            <pattern
              patternUnits='userSpaceOnUse'
              id='b'
              width='300'
              height='250'
              x='0'
              y='0'
              viewBox='0 0 1080 900'
            >
              {/* Add your pattern elements here */}
            </pattern>
          </defs>
          <rect x='0' y='0' fill='url(#a)' width='100%' height='100%'></rect>
          <rect x='0' y='0' fill='url(#b)' width='100%' height='100%'></rect>
        </svg>
      </div>

      {/* Avatar */}
      <div className='absolute w-[114px] h-[114px] bg-white rounded-full flex justify-center items-center top-[calc(50%-57px)] shadow-md'>
        <img
          src={props.profileImage}
          alt=''
          className='w-[100px] h-[100px] rounded-full object-cover'
        />
      </div>

      {/* Title */}
      <div className='mt-[60px] font-medium text-[18px] text-black'>
        {props.name}
      </div>

      {/* Subtitle */}
      <div className='mt-2 font-normal text-[15px] text-gray-500'>
        {props.email}
      </div>
      {/* <div className='mt-1 font-normal text-[8px] text-gray-500'>
        {props.party}
      </div> */}

      {/* Buttons */}

      <div className='mt-4 flex space-x-2'>
        {flag != true ? (
          <div className='flex space-x-2'>
            <button
              className={`w-[76px] h-[31px] border-2 rounded-[4px] font-bold text-[11px] uppercase transition-all duration-300 ${
                props.Voted
                  ? 'bg-red-500 text-white border-red-500 hover:bg-red-700'
                  : 'bg-green-500 text-white border-blue-300 hover:bg-blue-500'
              }`}
            >
              {props.role}
            </button>
            {User.role === 'admin' && (
              <button
                onClick={()=>setFlag(!flag)}
                className='w-[76px] h-[31px] border-2 border-black rounded-[4px] font-bold text-[11px] text-white bg-black uppercase transition-all duration-300 hover:bg-white hover:text-black'
              >
                nominee
              </button>
            )}
          </div>
        ) : (
          <div className=' flex space-x-2'>
            <div className='  flex-col justify-center'>
            <div className='flex flex-col items-center justify-center  p-2'>
             <label className='text-[9px]'>PartyName</label> 
            
            <input
              onChange={e => handleParty(e)}
              className=' w-[100%] border border-red-500'
              type='text'
              value={party}
              />

            </div>
           
              <div className='flex justify-around  '>
                <button onClick={handleConfirm} className='w-[56px] h-[25px] border-2 border-black rounded-[4px] font-bold text-[9px] text-white bg-[green] uppercase transition-all duration-300 hover:bg-white hover:text-black'>
                  Confirm
                </button>
                <button onClick={()=>setFlag(!flag)} className='w-[56px] h-[25px] border-2 border-black rounded-[4px] font-bold text-[9px] text-white bg-[red] uppercase transition-all duration-300 hover:bg-white hover:text-black'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
