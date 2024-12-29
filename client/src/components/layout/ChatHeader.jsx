import React, { useState } from 'react'
import Avatar from './Avatar'
import { useChatStore } from '@/store/useChatStore'
import { CircleX } from 'lucide-react';
import { userStore } from '@/store/userStore';
import { ShowProfile } from './ShowProfile';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = userStore();
    const [isProfileVisible, setIsProfileVisible] = useState(false);

    const handleCloseChat = () => {
        setSelectedUser(null);
    };

    const handleProfileClick = () => {
      setIsProfileVisible(!isProfileVisible);
    }

  return (
    <div className="flex items-center justify-between p-2 border-b border-t bg-white z-10 absolute right-1 left-1/4">
        <div className="flex items-center cursor-pointer" onClick={handleProfileClick}>
          <Avatar src={selectedUser.profilePic} alt={selectedUser.fullName} />
          <div className="ml-2">
            <p className="font-semibold">{selectedUser.fullName}</p>
            <p
              className={
                onlineUsers.includes(selectedUser._id)? "text-green-500" : "text-gray-500"
              }
            >
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={handleCloseChat}
          className="text-gray-500 hover:text-red-500"
        >
          <CircleX />
        </button>
        <ShowProfile open={isProfileVisible} onOpenChange={setIsProfileVisible} user={selectedUser} />
      </div>
  )
}

export default ChatHeader
