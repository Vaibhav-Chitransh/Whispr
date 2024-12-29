import { formatMessageTime } from "@/lib/utils";
import { useChatStore } from "@/store/useChatStore";
import { userStore } from "@/store/userStore";
import React from "react";
import Avatar from "./Avatar";

const SendedMsg = ({message}) => {
    const {selectedUser} = useChatStore();
    const { user } = userStore();
  return (
    <div className="flex justify-end items-end gap-1 w-3/5">
      <div className="bg-gray-200 flex flex-col px-3 items-end border rounded-3xl rounded-br-none">
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
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border">
          <Avatar src={message.senderId === user._id ? user.profilePic : selectedUser.profilePic} alt={'profilePic'} />
        </div>
      </div>
    </div>
  );
};

export default SendedMsg;
