import ChatHeader from "@/components/layout/ChatHeader";
import ChatInput from "@/components/layout/ChatInput";
import ChatMessage from "@/components/layout/ChatMessage";

const ChatPage = () => {
  return (
    <div className="flex flex-col w-3/4">
      <ChatHeader />
      <ChatMessage />
      <ChatInput />
    </div>
  );
};

export default ChatPage;
