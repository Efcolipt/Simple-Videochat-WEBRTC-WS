/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { chat } = useContext(ChatContext);
  const isOwner = message.senderId === currentUser.uid;
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`meeting-chat__message ${isOwner && "meeting-chat__message--owner"
        }`}
    >
      <div className="meeting-chat__message-info">
        <img src={isOwner ? currentUser.photoURL : chat.user.photoURL} alt="" />
        <span></span>
      </div>
      <div className="meeting-chat__message-content">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
