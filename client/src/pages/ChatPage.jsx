import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/useChatStore";
import React, { useEffect, useState } from "react";
import Avatar from "@/components/layout/Avatar";
import { CircleX, SendHorizonal } from "lucide-react";

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

  console.log(messages);

  return (
    <div className="w-3/4 border border-black flex flex-col h-screen relative">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b bg-white z-10 absolute right-1 left-1">
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
      <div className="flex-grow overflow-y-auto p-2 pt-2 absolute border border-black top-20 bottom-36 left-1 right-1">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-start mb-2 ${
              message.senderId !== selectedUser._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {message.senderId !== selectedUser._id && (
              <Avatar
                src={selectedUser.profilePic}
                alt={selectedUser.fullName}
              />
            )}
            <div
              className={`max-w-xs p-3 rounded-lg shadow-md ${
                message.senderId === selectedUser._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } ${message.senderId === selectedUser._id ? "ml-2" : "mr-2"}`}
            >
              <p>{message.text}</p>
            </div>
            {message.senderId === selectedUser._id && (
              <Avatar
                src={selectedUser.profilePic}
                alt={selectedUser.fullName}
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex p-2 bg-white border-t absolute bottom-20 right-1 left-1">
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
