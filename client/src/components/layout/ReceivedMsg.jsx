import { formatMessageTime } from "@/lib/utils";
import { useChatStore } from "@/store/useChatStore";
import { userStore } from "@/store/userStore";
import React from "react";

const ReceivedMsg = ({message}) => {
    const {selectedUser} = useChatStore();
    const { user } = userStore();

  return (
    <div className="flex justify-start items-end w-3/5 gap-1">
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border">
          <img className="rounded-full"
            src={
              message.senderId === user._id
                ? user.profilePic || "/avatar.png"
                : selectedUser.profilePic || "/avatar.png"
            }
          />
        </div>
      </div>
      <div className="flex flex-col items-start border rounded-xl bg-gray-300 px-2">
        <div className="chat-bubble flex flex-col">
          {message.image && (
            <img
              src={message.image}
              alt="Attachment"
              className="sm:max-w-[200px] rounded-md mb-2"
            />
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
