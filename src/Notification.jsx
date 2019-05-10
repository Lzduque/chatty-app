import React from "react";

function Notification({ oldUserName, newUserName}) {
  return (
    <div className="message system">
      <span className="notification-content">{oldUserName} changed their name to {newUserName}.</span>
    </div>
  )
}

export default Notification;
