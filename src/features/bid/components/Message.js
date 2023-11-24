import React from "react";
import "./Message.css";
const Message = ({ user, message, classs }) => {
  if (user) {
    return (
      <div className={`agbalumo messagebox ${classs}`}>{`${user}: ${message}`}</div>
    );
  } else {
    return <div className={`agbalumo messagebox ${classs}`}>{`you: ${message}`}</div>;
  }
};

export default Message;
