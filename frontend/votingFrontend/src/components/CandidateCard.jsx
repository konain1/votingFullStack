import React from 'react'
import { useEffect, useState } from 'react'
import CreateCandidate from './CreateCandidate'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRotate } from '@fortawesome/free-solid-svg-icons'; 


const CandidateCard = ({ handlefetchCandidates, data }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('loginUser'))
  )

  const token = localStorage.getItem('token') // Assuming you are using token-based authentication

  const handleDelete = async id => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/candidate/api/v1/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.status === 200) {
        alert('Candidate deleted successfully!')
        handlefetchCandidates()
        // Optionally, you can remove the candidate from the state to update the UI
        // setCandidates((prevCandidates) => prevCandidates.filter(candidate => candidate._id !== id));
      } else {
        alert('Failed to delete the candidate')
      }
    } catch (error) {
      console.error('Error deleting candidate:', error)
      alert('An error occurred while deleting the candidate')
    }
  }

  const handleVoting = async Cand_id => {
    try {
      let response = await axios.post(
        `http://localhost:4001/candidate/vote/${Cand_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      console.log('response', response)

      if (response.status == 200) {
        alert('voted')
        const updatedUser = { ...user, isVoted: true }
        localStorage.setItem('loginUser', JSON.stringify(updatedUser))
        setUser(updatedUser)
        handlefetchCandidates()
      } else {
        alert('error')
        alert('An error occurred while voting')
      }
    } catch (error) {
      throw new Error('voting Error ', error)
    }
  }

  useEffect(() => {
    console.log("dATA CHANGED", data)
  }, [data]);

  return (
    <>
      <div className='flex justify-center mx-40 my-10'>
        {user.role == 'admin' && (
          <button
            onClick={() => setIsVisible(!isVisible)}
            className={`${
              isVisible ? 'bg-red-500' : 'bg-[#49c8db]'
            } border-2 border-[#24b4fb] bg-[#24b4fb] rounded-lg px-4 py-2 transition-all duration-200 ease-in-out text-base hover:bg-[#0071e2]`}
          >
            {isVisible ? (
              <span class='flex justify-center items-center text-white font-semibold'>
                Close
              </span>
            ) : (
              <span class='flex justify-center items-center text-white font-semibold'>
                Create
              </span>
            )}
          </button>
        )}
      </div>
      <div className='relative flex justify-center items-center sm:top-[38%] top-[50%]'>
        {isVisible ? (
          <CreateCandidate
            setIsVisible={setIsVisible}
            handlefetchCandidates={handlefetchCandidates}
          />
        ) : (
          ''
        )}
      </div>

      <div className='flex flex-wrap justify-center items-center'>
        {data.map((candidate, index) => (
          <>
            <div key={candidate._id}>
              <div className='w-[300px] p-[25px] bg-[#EBD18D] rounded-[20px] font-system-ui'>
                <div className='flex flex-row items-center justify-between'>
                  <div className='relative flex flex-row items-center z-10 '>
                  {
                    user.isVoted === true ? <>
                    <div key={candidate._id} className='flex justify-center items-center font-medium text-[16px] text-white w-[40px] h-[40px] rounded-full bg-[red]'>
                     {candidate.votesCount}
                    </div> 
                    </>
                    :
                    <>
                    <div className='flex justify-center items-center   font-medium text-[16px] text-white w-[40px] h-[40px] rounded-full bg-[green]'>
   
                    {candidate.votesCount}
                 
                    </div>
                    </>
                  }
                  
                    <div className='absolute left-[25px] z-0 w-[42px] h-[42px]'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 128 128'
                        className='w-full h-full'
                      >
                        {/* SVG content */}
                      </svg>
                    </div>
                    <div className='absolute left-[50px] z-[-2] w-[42px] h-[42px]'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 128 128'
                        className='w-full h-full'
                      >
                        {/* SVG content */}
                      </svg>
                    </div>
                  </div>
                  <div className='w-[40px] h-[40px] bg-[#F6DB96] rounded-full flex items-center justify-center cursor-pointer'>
                    {/* <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='4'
                      viewBox='0 0 4 20'
                      height='20'
                      fill='none'
                    >
                      <g fill='#a24d4e'>
                        <path d='m2 4c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2z'></path>
                        <path d='m2 12c1.10457 0 2-.8954 2-2 0-1.10457-.89543-2-2-2s-2 .89543-2 2c0 1.1046.89543 2 2 2z'></path>
                        <path d='m2 20c1.10457 0 2-.8954 2-2s-.89543-2-2-2-2 .8954-2 2 .89543 2 2 2z'></path>
                      </g>
                    </svg> */}
                    {
                        user.role == 'admin' ?  <button  onClick={() => handleDelete(candidate._id)}> <i className="fa-solid fa-trash text-[red]"></i>  </button>: <button onClick={()=>handleVoting(candidate._id)}  > <i class="fa-solid fa-handshake"></i> </button>
                    }
                  
                  </div>
                </div>
                <div className='mt-[50px] font-extrabold text-[25px] text-black'>
                 {
                    candidate.name
                 }
                </div>
                <div className='mt-[15px] font-normal text-[15px] text-black'>
                 <h4>Party:  {candidate.party}</h4>
                 <h4>email:  {candidate.email}</h4>

                </div>
                <div className='mt-[50px] font-medium text-[14px] text-black'>
                  <span className='font-bold text-black'>{candidate.votesCount}</span> out of /{' '}
                  <span className='font-bold text-black'>45%</span>
                </div>
                <div className='w-full mt-[15px]'>
                  <progress
                    className='w-full h-[4px] rounded-full bg-[#00000030]'
                    max='100'
                    value='40'
                  ></progress>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default CandidateCard
