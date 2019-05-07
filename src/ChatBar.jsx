import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
        <input className="chatbar-message" onKeyUp={this.props.addMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;
