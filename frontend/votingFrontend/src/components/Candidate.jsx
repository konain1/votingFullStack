function Candidate(props) {
    console.log(props.data);
    return (
      <>
        <div className='h-[100vh] justify-center'>
          <div className='flex justify-center mx-40 my-10'>
            <button className='bg-[#49c8db] p-1 rounded-xl cursor-pointer border border-black font-stonewalls'>Create</button>
          </div>
          <div className='flex flex-wrap justify-center items-center '>
            {props.data.map((candidate, index) => {
              return (
                <div
                  key={index}
                  id="card"
                  className="w-[300px] sm:w-[400px] m-5 h-[150px] sm:h-[300px] border flex-col justify-evenly rounded-lg"
                >
                  <div className="h-[70%] flex-col mx-5 sm:mx-10 justify-between py-5 sm:py-10 text-[20px] sm:text-[30px]">
                    <h4 className="font-stonewalls">Name: {candidate.name}</h4>
                    <h4 className="font-stonewalls">Party: {candidate.party}</h4>
                    <h4 className="font-stonewalls">Vote: {candidate.votesCount}</h4>
                  </div>
  
                  <div className="h-[30%] flex justify-around items-center rounded-lg">
                    <button className="bg-[#494952] active:scale-95 px-6 sm:px-10 py-1 sm:py-2 text-sm rounded-md text-white">
                      Edit
                    </button>
                    <button className="bg-red-500 active:scale-95 px-6 sm:px-10 py-1 sm:py-2 text-sm rounded-md text-white">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
  
  export default Candidate;
  