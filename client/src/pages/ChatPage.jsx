import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/useChatStore";
import React, { useEffect, useState } from "react";
import Avatar from "@/components/layout/Avatar";
import { CircleX, SendHorizonal } from "lucide-react";

const ChatPage = () => {
  const { selectedUser, messages, getMessages, setSelectedUser } =
    useChatStore();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser]);

  const handleSendMessage = async () => {
    console.log(`Sending Message: ${newMessage}`);
    setNewMessage("");
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
  };

  return (
    <div className="w-3/4 flex flex-col m-2 border border-black static h-max">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b bg-white z-10">
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
      <div className="flex-grow overflow-y-auto p-2 pt-2">
        {messages.map((message) => (
          <div key={message._id} className="mb-2">
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex p-2 bg-white border-t static bottom-10">
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
