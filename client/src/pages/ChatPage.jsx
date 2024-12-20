import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/useChatStore";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "@/components/layout/Avatar";
import { CircleX, SendHorizonal } from "lucide-react";
import { userStore } from "@/store/userStore";
import { formatMessageTime } from "@/lib/utils";

const ChatPage = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    setSelectedUser,
    sendMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const {user} = userStore();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    console.log(`Sending Message: ${newMessage}`);
    sendMessage({ text: newMessage });
    setNewMessage("");
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
  };

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log(messages);

  return (
      <div className="flex flex-col w-3/4">
      {/* Header */}
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

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 absolute bottom-16 top-32 right-1 left-1/4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === user._id ? "justify-end" : "justify-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === user._id
                      ? user.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
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
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex p-2 bg-white border-t absolute bottom-2 right-1 left-1/4">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow"
        />
        <Button onClick={handleSendMessage} className="ml-2">
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
