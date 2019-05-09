import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log(this.props.userColor);
    return (
        <div className="message">
          <span className="message-username" style={{ color: this.props.userColor }}>{this.props.appUsername}</span>
          <span className="message-content">{this.props.appMessage}</span>
        </div>
    )
  }
}

export default Message;
