import React from 'react';

function Notification(props) {
  return (
    <div className="message system">
      <span className="notification-content">{props.oldUserName} changed their name to {props.newUserName}.</span>
    </div>
  )
}

export default Notification;
