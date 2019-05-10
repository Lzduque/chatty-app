import React from 'react';

function ChatBar(props) {
  return (
    <footer className='chatbar'>
      <input className='chatbar-username' onKeyUp={props.addUserName} placeholder={props.currentUser.name} />
      <input className='chatbar-message' onKeyUp={props.addMessage} placeholder='Type a message and hit ENTER' />
    </footer>
  )
}

export default ChatBar;
