import React, {Component} from 'react';

class Notification extends Component {
  render() {
    return (
      <div className="message system">
        <span className="notification-content">{this.props.oldUserName} changed their name to {this.props.newUserName}.</span>
      </div>
    )
  }
}

export default Notification;
