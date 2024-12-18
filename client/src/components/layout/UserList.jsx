import React from 'react'

const UserList = ({users, onSelectUser}) => {
  return (
    <div className='user-list'>
      {users.map((user) => {
        return (
            <div key={user._id} onClick={() => onSelectUser(user)} className='user-item'>
                {user.fullName}
            </div>
        )
      })}
    </div>
  )
}

export default UserList
