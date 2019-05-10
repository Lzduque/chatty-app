import React from "react";

function Message({ appMessage , userColor , appUsername}) {
  return (
    <div className="message">
      <span className="message-username"
            style={{ color: userColor }}>{appUsername}</span>
      <span className="message-content">{appMessage}</span>
    </div>
  )
}

export default Message;
