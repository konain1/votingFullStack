import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../Card'

function Contacts ({ users }) {
  const loggedInUserId = localStorage.getItem('userId')

  const handleDelete = async userId => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.delete(
        `http://localhost:4001/api/v1/deleteUser/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.status === 200) {
        alert('User deleted successfully!')
        // Optionally, remove the deleted user from the state to update the UI
        // setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
      } else {
        alert('Failed to delete the user.')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('An error occurred while deleting the user.')
    }
  }

 

  
  return (
    <div className='flex-wrap my-5 justify-center items-center'>
      <div className='flex flex-wrap justify-around items-center w-[80%] mx-auto gap-5'>
        {users
          .filter(user => user._id !== loggedInUserId)
          .map(user => (
            <div key={user._id}>
            
              <Card
                key={user.phone}
                name={user.name}
                email={user.email}
                role={user.role}
                Voted={user.isVoted}
                profileImage={user?.profileImage}
                age={user.age}
                
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Contacts
