import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/DashboarduserSlice';
import getCandidate from '../redux/CandidateThunk';



const CandidateCard = () => {
  const [candidates, setCandidate] = useState([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  // Get candidates from Redux store
  const CandidateData = useSelector(state => state.CandidateStore.candidates);
  const user = useSelector(state => state.UserStore.User);

  // Memoized fetch function
  const handlefetchCandidatesMemoized = useCallback(() => {
    if (CandidateData) {
      setCandidate(CandidateData.candidates);
    }
  }, [CandidateData]);

  useEffect(() => {
    handlefetchCandidatesMemoized(); // Call the memoized fetch function
  }, [CandidateData, handlefetchCandidatesMemoized]);

  useEffect(()=>{
    dispatch(getCandidate())
    if(candidates.length == 0){
      ResetUserVotedValue()
    }
    
  },[dispatch])

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


  const handleDelete = async id => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/candidate/api/v1/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert('Candidate deleted successfully!');
        dispatch(getCandidate())
      } else {
        alert('Failed to delete the candidate');
      }
    } catch (error) {
      console.error('Error deleting candidate:', error);
      alert('An error occurred while deleting the candidate');
    }
  };

  const handleVoting = async Cand_id => {

    try {
      const response = await axios.post(
        `http://localhost:4001/candidate/vote/${Cand_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert('Voted successfully');
        const updatedUser = { ...user, isVoted: true };
        dispatch(loginUser(updatedUser));
        dispatch(getCandidate())
      } else {
        alert('An error occurred while voting');
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('An error occurred while voting');
    }
  };

  return (
    <>
      {/* Candidate list UI */}
      <div className="flex flex-wrap justify-around items-center">
        {candidates?.map((candidate, index) => (
          <div key={candidate.email}>
            <div className="w-[300px] my-2 p-[25px] bg-[#EBD18D] rounded-[20px] font-system-ui">
              <div className="flex flex-row items-center justify-between">
                {/* Voting and delete button */}
                <div className="relative flex flex-row items-center z-10">
                  {user.isVoted === true ? (
                    <div className="flex justify-center items-center font-medium text-[16px] text-white w-[40px] h-[40px] rounded-full bg-[red]">
                      {candidate.votesCount}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center font-medium text-[16px] text-white w-[40px] h-[40px] rounded-full bg-[green]">
                      {candidate.votesCount}
                    </div>
                  )}
                </div>
                <div className="w-[40px] h-[40px] bg-[#F6DB96] rounded-full flex items-center justify-center cursor-pointer">
                  {user.role === 'admin' ? (
                    <button onClick={() => handleDelete(candidate._id)}>
                      <i className="fa-solid fa-trash text-[red]"></i>
                    </button>
                  ) : (
                    <button onClick={() => handleVoting(candidate._id)}>
                      <i className="fa-solid fa-handshake"></i>
                    </button>
                  )}
                </div>
              </div>
              {/* Candidate details */}
              <div className="mt-[50px] font-extrabold text-[25px] text-black">
                {candidate.name}
              </div>
              <div className="mt-[15px] font-normal text-[15px] text-black">
                <h4>Party: {candidate.party}</h4>
                <h4>Email: {candidate.email}</h4>
              </div>
              <div className="mt-[50px] font-medium text-[14px] text-black">
                <span className="font-bold text-black">{candidate.votesCount}</span> out of /{' '}
                <span className="font-bold text-black">45%</span>
              </div>
              <div className="w-full mt-[15px]">
                <progress className="w-full h-[4px] rounded-full bg-[#00000030]" max="100" value="40"></progress>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CandidateCard;
