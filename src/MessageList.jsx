import React, {Component} from 'react';
import Message from './Message.jsx';

{/*needs function*/}
class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <Message />
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    )
  }
}

export default MessageList;
