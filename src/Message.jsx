import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
        <div className="message">
          <span className="message-username">{this.props.appUsername}</span>
          <span className="message-content">{this.props.appMessage}</span>
        </div>
    )
  }
}

export default Message;
