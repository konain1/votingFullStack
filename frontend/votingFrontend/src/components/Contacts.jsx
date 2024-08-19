import React from 'react'

function Contacts({users}) {

    console.log(users)

  return (
   <>
    <div className='flex-wrap'>
        <div>
UPPER
        </div>
        <div>middle</div>
        <div className=' flex flex-wrap justify-around items-end '>
        {users.map((user)=>{
            return(
                <div key={user.phone} className='flex-wrap border border-black w-[60vw] h-[40vh] sm:w-[20vw] rounded-lg'>
                <div className='h-[40%] w-[100%]'>
                    <img  className='h-[100%] w-[100%] rounded-lg'src='https://images.unsplash.com/photo-1723687107501-27f09ef2017e?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                </div>
                <div className='flex-wrap justify-center  h-[40%] p-2'>

                <h1 className='sm:text-[30px]'>Name : {user.name}</h1>
                <h2 className='sm:text-[15px]'>Email : {user.email}</h2>
                <h2 className='sm:text-[15px]'>Phone : {user.phone}</h2>
                <h2 className='sm:text-[15px]'>Voted : {user.isVoted == true ? "Yes" : "No"}</h2>
                </div>
                <div className='flex justify-around '>
                <button className="bg-[#494952] active:scale-95 px-6 sm:px-10 py-1 sm:py-2 text-sm rounded-md text-white">
                    Edit
                  </button>
                  <button className="bg-red-500 active:scale-95 px-6 sm:px-10 py-1 sm:py-2 text-sm rounded-md text-white">
                    Delete
                  </button>
                </div>
                </div>
              
            )
        })}
       

        </div>
    </div>

   </>
  )
}

export default Contacts