import React from 'react';
import axios from 'axios';

function Contacts({ users }) {
  const loggedInUserId = localStorage.getItem('userId'); // Assuming you store the logged-in user's ID in localStorage

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`http://localhost:4001/api/v1/deleteUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        alert('User deleted successfully!');
        // Optionally, remove the deleted user from the state to update the UI
        // setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
      } else {
        alert('Failed to delete the user.');
      }

    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };

  return (
    <div className='flex-wrap my-5 justify-center items-center'>
      <div className='flex flex-wrap justify-around items-center w-[80%] mx-auto gap-5'>
        {users.filter(user => user._id !== loggedInUserId).map((user) => (
          <div key={user._id} className='flex-wrap border border-black w-[60vw] h-[40vh] sm:w-[20vw] rounded-lg'>
            <div className='h-[40%] w-[100%]'>
              <img
                className='h-[100%] w-[100%] rounded-lg'
                src='https://images.unsplash.com/photo-1723687107501-27f09ef2017e?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='User'
              />
            </div>
            <div className='flex-wrap justify-center h-[40%] p-2'>
              <h1 className='sm:text-[30px] text-[25px]'>Name: {user.name}</h1>
              <h2 className='sm:text-[15px] text-[12px]'>Email: {user.email}</h2>
              <h2 className='sm:text-[15px] text-[12px]'>Phone: {user.phone}</h2>
              <h2 className='sm:text-[15px] text-[12px]'>Voted: {user.isVoted ? "Yes" : "No"}</h2>
            </div>
            <div className='flex justify-around'>
              {user.role === 'admin' ? (
                <>
                  <button className="bg-[#387336] active:scale-95 px-6 sm:px-5 py-1 sm:py-2 text-xs rounded-md text-white">
                    Create Request 
                  </button>
                  <button onClick={() => handleDelete(user._id)} className="bg-[#ef4f4f] active:scale-95 px-6 sm:px-5 py-1 sm:py-2 text-xs rounded-md text-white">
                    Delete Request
                  </button>
                </>
              ) : (
                <button className="bg-[#494952] active:scale-95 px-6 sm:px-10 py-1 sm:py-2 text-sm rounded-md text-white">
                  View
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
