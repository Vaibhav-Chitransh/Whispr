import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Textarea from "@/components/layout/Textarea";
import { useChatStore } from "@/store/useChatStore";
import ChatPage from "./ChatPage";

const HomePage = () => {
  const {selectedUser} = useChatStore();

  return (
    <div className="flex items-center justify-center mx-6 my-2">
      <Sidebar />
      {selectedUser ? <ChatPage /> : <Textarea />}
    </div>
  );
};

export default HomePage;
