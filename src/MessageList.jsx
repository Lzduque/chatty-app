import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

{/*needs function*/}
class MessageList extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log('this.props.color: ',this.props.messages.userColor);
    return (
      <main className="messages">
      { this.props.messages.map((data, index) => {
          if (data.type === 'incomingMessage') {
            return (<Message
              key={ data.id }
              appUsername={ data.username }
              appMessage={ data.content }
              userColor={ data.userColor }
            />)
          } else {
            return (<Notification
              key={ data.id }
              oldUserName={ data.oldusername }
              newUserName={ data.newusername }
            />)
          }
      })}
      </main>
    )
  }
}

export default MessageList;
