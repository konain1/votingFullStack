import { useEffect, useState } from 'react'
import CreateCandidate from './CreateCandidate'
import axios from 'axios'

function Candidate ({ handlefetchCandidates, data }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('loginUser')))

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



  const handleVoting = async (Cand_id)=>{


    try {

     
        
        let response = await axios.post(`http://localhost:4001/candidate/vote/${Cand_id}`,{},{
          headers: { Authorization: `Bearer ${token}` }
        })
    
      console.log("response" , response)

      if(response.status == 200){
        alert("voted")
        const updatedUser = {...user,isVoted:true}
        localStorage.setItem('loginUser', JSON.stringify(updatedUser))
        setUser(updatedUser)
        handlefetchCandidates()
      }else{
        alert("error")
        alert('An error occurred while voting')
      }
     
      
      
    } catch (error) {
      throw new Error("voting Error ",error)
    }
    
  }
  
  return (
    <>
      <div className='h-[100vh]  justify-center relative'>
        <div className='flex justify-center mx-40 my-10'>
        {
          user.role  == 'admin' &&
          (
            <button
            onClick={() => setIsVisible(!isVisible)}
            className={`${
              isVisible ? 'bg-red-500' : 'bg-[#49c8db]'
            } border-2 border-[#24b4fb] bg-[#24b4fb] rounded-lg px-4 py-2 transition-all duration-200 ease-in-out text-base hover:bg-[#0071e2]`}
          >
            {isVisible ? <span class="flex justify-center items-center text-white font-semibold">
    Close
  </span>: <span class="flex justify-center items-center text-white font-semibold">
    Create
  </span>}
          </button>
          )
        }
         
        </div>
        <div className='relative flex justify-center items-center top-[28%]'>
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
          {data.map((candidate, index) => {
            return (
              <div
                key={candidate._id}
                id='card'
                className='w-[300px] sm:w-[400px] m-5 h-[150px] sm:h-[300px] border flex-col justify-evenly rounded-lg'
              >
                <div className='h-[70%] flex-col mx-5 sm:mx-10 justify-between py-5 sm:py-10 text-[20px] sm:text-[30px] '>
                  <h4 className='font-stonewalls'>Name: {candidate.name}</h4>
                  <h4 className='font-stonewalls'>Party: {candidate.party}</h4>
                  <h4 className='font-stonewalls'>
                    Vote: {candidate.votesCount}
                  </h4>
                </div>

                {
                  user.role  == 'admin' ?
                  <>
                  <div className='h-[30%] flex justify-around items-center rounded-lg relative'>
                  <button className='bg-[#494952] active:scale-95 px-6 sm:px-10 py-1 sm:py-2 text-sm rounded-md text-white'>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(candidate._id)}
                    className='bg-red-500 active:scale-95 px-6 sm:px-10 py-1 sm:py-2 text-sm rounded-md text-white'
                  >
                    Delete
                  </button>
                </div>
                  </> : 
                  <>
                  <div className='h-[30%] flex justify-around items-center rounded-lg relative'>
                  {
                    user.isVoted == true ? <>
                    <button className='bg-[#ef2626] active:scale-95 px-6 sm:px-10 py-1 sm:py-2 text-sm rounded-md text-white'>
                    Voted
                  </button>
                    </> :
                     <>
                     <button onClick={()=>handleVoting(candidate._id)} className='bg-[#2ad462] active:scale-95 px-6 sm:px-10 py-1 sm:py-2 text-sm rounded-md text-white'>
                    Vote
                  </button>
                    </>
                  }
                 
                  
                </div>
                  </>
                }
               

              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Candidate
