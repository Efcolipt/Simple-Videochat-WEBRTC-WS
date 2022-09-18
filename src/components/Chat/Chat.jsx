import React from "react";
import ChatNavbar from "./ChatNavbar";
import Messages from "./Messages";
import SendInput from "./SendInput";

const Chat = () => {
  return (
    <div className="meeting-chat">
      <ChatNavbar />
      <Messages />
      <SendInput />
    </div>
  );
};

export default Chat;
