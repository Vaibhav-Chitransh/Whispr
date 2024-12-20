import React from 'react'
import Avatar from './Avatar'
import { useChatStore } from '@/store/useChatStore'
import { CircleX } from 'lucide-react';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();

    const handleCloseChat = () => {
        setSelectedUser(null);
    };

  return (
    <div className="flex items-center justify-between p-2 border-b border-t bg-white z-10 absolute right-1 left-1/4">
        <div className="flex items-center">
          <Avatar src={selectedUser.profilePic} alt={selectedUser.fullName} />
          <div className="ml-2">
            <p className="font-semibold">{selectedUser.fullName}</p>
            <p
              className={
                selectedUser.isOnline ? "text-green-500" : "text-red-500"
              }
            >
              {selectedUser.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={handleCloseChat}
          className="text-gray-500 hover:text-red-500"
        >
          <CircleX />
        </button>
      </div>
  )
}

export default ChatHeader
