import React, { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");

  const getMessageTypeClass = (type) => {
    switch (type) {
      case "SUCCESS":
        return "success";

      case "WARNING":
        return "warning";

      case "INFO":
        return "info";

      default:
        return "";
    }
  };

  const getPrintedMessage = (chatMessage) => {
    if (chatMessage.sender === null) {
      return chatMessage.message;
    } else {
      const username = room.players.filter(p => p.id === chatMessage.sender)[0].username;
      return `${username}: ${chatMessage.message}`;
    }
  }

  return (
    <div className="sidebar">
      <div className="chat">
        <div className="boxChat">
          <ScrollToBottom className="chatMessages">
            {room.chatMessages.map((chatMessage, index) => {
              return (
                <p
                  key={index}
                  className={getMessageTypeClass(chatMessage.type)}
                >
                  {getPrintedMessage(chatMessage)}
                </p>
              );
            })}
          </ScrollToBottom>
          <div className="boxInput">
            <input
              className="form-control"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your guess here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
