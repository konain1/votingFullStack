
import axios from "axios";
const useResetVotedValue = ()=>{


   
    async function fetchVotedValue() {
        console.log('it util custome hook')
        try {
            let response = await axios.post('http://localhost:4001/api/v1/resetUserVoterValue');
    
            if (response.status === 200) {
              console.log('reset the isVoted value');
            }
          } catch (error) {
            console.log('got error at resetUserVoterValue', error);
          }
    }

    return fetchVotedValue;
   
}

export default useResetVotedValue