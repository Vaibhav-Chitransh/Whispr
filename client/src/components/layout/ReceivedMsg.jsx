import { formatMessageTime } from "@/lib/utils";
import { useChatStore } from "@/store/useChatStore";
import { userStore } from "@/store/userStore";
import React from "react";
import Avatar from "./Avatar";

const ReceivedMsg = ({message}) => {
    const {selectedUser} = useChatStore();
    const { user } = userStore();

  return (
    <div className="flex justify-start items-end w-3/5 gap-1">
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border">
          <Avatar src={message.senderId === user._id ? user.profilePic : selectedUser.profilePic} alt={'profilePic'} />
        </div>
      </div>
      <div className="flex flex-col items-start border rounded-3xl rounded-bl-none bg-gray-200 px-3">
        <div className="chat-bubble flex flex-col">
          {message.image && (
            <Avatar src={message.image} alt={'profilePic'} />
          )}
          {message.text && <p>{message.text}</p>}
        </div>
        <div className="chat-header mb-1">
          <time className="text-xs opacity-50 ml-1">
            {formatMessageTime(message.createdAt)}
          </time>
        </div>
      </div>
    </div>
  );
};

export default ReceivedMsg;
