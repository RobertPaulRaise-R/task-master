import { createContext, useState } from "react";
import ChatSection from "../features/chat/ChatSection";
import PeopleSection from "../features/chat/PeopleSection";

export const ChatContext = createContext({});

function Chat() {
  const [showChat, setShowChat] = useState(false);

  return (
    <ChatContext.Provider value={{ showChat, setShowChat }}>
      <div className="grid w-full grid-cols-8 gap-8 p-4">
        <PeopleSection />
        {showChat && <ChatSection />}
      </div>
    </ChatContext.Provider>
  );
}

export default Chat;
