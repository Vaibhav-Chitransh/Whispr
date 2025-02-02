import { useChatStore } from "@/store/useChatStore";
import { userStore } from "@/store/userStore";
import React, { useEffect, useRef } from "react";
import SendedMsg from "./SendedMsg";
import ReceivedMsg from "./ReceivedMsg";

const ChatMessage = () => {
  const {
    messages,
    selectedUser,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    sendMessage
  } = useChatStore();
  const messageEndRef = useRef(null);
  const { user } = userStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, subscribeToMessages, unsubscribeFromMessages, sendMessage]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 absolute bottom-16 top-32 right-1 left-1/4">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`flex ${
            message.senderId === user._id ? "justify-end" : "justify-start"
          }`}
          ref={messageEndRef}
        >
          {message.senderId === user._id ? (
            <SendedMsg message={message} />
          ) : (
            <ReceivedMsg message={message} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
