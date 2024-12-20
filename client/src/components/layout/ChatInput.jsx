import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";

const ChatInput = () => {
    const [newMessage, setNewMessage] = useState("");
    const {sendMessage} = useChatStore();

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;
        console.log(`Sending Message: ${newMessage}`);
        sendMessage({ text: newMessage });
        setNewMessage("");
      };

  return (
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
  );
};

export default ChatInput;
