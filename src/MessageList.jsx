import React, {Component} from 'react';
import Message from './Message.jsx';

{/*needs function*/}
class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="messages">
      { this.props.messages.map((data, index) =>
          <Message
          key={ data.id }
          appUsername={ data.username }
          appMessage={ data.content }
          />
      )}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    )
  }
}

export default MessageList;
