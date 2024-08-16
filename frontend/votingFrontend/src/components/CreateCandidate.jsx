import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCandidate({setIsVisible}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [age, setAge] = useState('');

  const data = { email, name, party, age };
  const navigate = useNavigate()

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
    
      if (response.status === 201) {
        console.log('Candidate created successfully');
        // navigate('/dashboard')
      } else {
        console.error('Error creating candidate', response.data);
      }
    } catch (error) {
      console.error('Error creating candidate:', error);
    }
  }

  function handleForm(e) {
    e.preventDefault();
    console.log(data);
    createNominees();
    setIsVisible(false)
  

  }

  return (
    <div className="flex justify-center  items-center h-[60vh] absolute z-20 sm:w-[30%]  sm:left-[35%]">
      <form onSubmit={handleForm} className='bg-black text-white p-6 rounded-lg sm:w-[100%]'>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col'>
            <label className="mb-2">Email:</label>
            <input
              type='email'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="p-2 rounded bg-white text-black"
            />
          </div>
          <div className='flex flex-col'>
            <label className="mb-2">Name:</label>
            <input
              type='text'
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="p-2 rounded bg-white text-black"
            />
          </div>
          <div className='flex flex-col'>
            <label className="mb-2">Age:</label>
            <input
              type='number'
              required
              onChange={(e) => setAge(e.target.value)}
              value={age}
              className="p-2 rounded bg-white text-black"
            />
          </div>
          <div className='flex flex-col'>
            <label className="mb-2">Party:</label>
            <input
              type='text'
              required
              onChange={(e) => setParty(e.target.value)}
              value={party}
              className="p-2 rounded bg-white text-black"
            />
          </div>
          <button type='submit' className="bg-orange-500 text-white p-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCandidate;
