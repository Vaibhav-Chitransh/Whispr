import UserList from "@/components/layout/UserList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchMessages } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(async () => {
    if(selectedUser) {
      const res = await fetchMessages(selectedUser._id);
      setMessages(res.data);
    }
  }, [selectedUser])

  const handleSendMessage = async () => {
    if(!newMessage.trim()) return ;

    try {
      const res = await sendMessage({text: newMessage, userId: selectedUser._id});
      setMessages((prevMsg) => [...prevMsg, res.data]);
      setNewMessage('');
    } catch (error) {
      console.log(`Error in sending message: ${error}`);
      toast.error("Failed to send message. Please try again.");
    }
  }

  return (
    <div className="flex">
      <div className="sidebar">
        <UserList users={users} onSelectUser ={setSelectedUser} />
      </div>
      <div className="chat-area">
        <div className="messages">
          {messages.map((msg) => {
            return (
              <div key={msg._id} className="message">
                <p>{msg.text}</p>
              </div>
            );
          })}
          <div className="input-area">
            <Input
              value={newMessage}
              placeholder="Type a message..."
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
