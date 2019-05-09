import React from 'react';

function Message(props) {
  return (
    <div className="message">
      <span className="message-username" style={{ color: props.userColor }}>{props.appUsername}</span>
      <span className="message-content">{props.appMessage}</span>
    </div>
  )
}

export default Message;
