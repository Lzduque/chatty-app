import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
      currentUser: {name: 'Anonymous' , id: Math.floor(Math.random()*(1000 - 1) + 1)},
      messages: [],
      users: 0
    };
  }


  componentDidMount = () => {

    // when the user connects it sends the userId to the server
    this.socket.onopen = (event) => {
      console.log('Connected to server');
      this.sendMessageToServer({ userId: this.state.currentUser.id });
    };

    // everytime a message comes --> select if it is a color, if it is the user number or a normal message
    this.socket.onmessage = (evt) => {

      if (evt.data.startsWith('#')) {
        this.setState({ color: evt.data });
      } else if (evt.data == parseInt(evt.data)) {
        this.setState({ users: evt.data });
      } else {
        this.setState({ messages: this.state.messages.concat(JSON.parse(evt.data).message)});
      };
    }
  }


  // general sending message - stringify
  sendMessageToServer = (msg) => {
    this.socket.send(JSON.stringify(msg));
  }

  // to send the message to the server, when it is a normal message
  addMessage = (evt) => {
    if (evt.key === 'Enter') {

      // checking empty fields
      if (!evt.target.value) return;

      let msg = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        userId: this.state.currentUser.id,
        content: evt.target.value
      };

      // Send the msg object as a JSON-formatted string.
      this.sendMessageToServer({ message: msg });

      evt.target.value = '';
    }
  };

  // to send the notification to the server, when user changes name
  addUserName = (evt) => {
    // capture the actual data
    const oldusername = this.state.currentUser.name;
    const userId = this.state.currentUser.id;

    if (evt.key === 'Enter') {

      // checking empty fields
      if (!evt.target.value) return;

      // change the current user name in the state
      this.setState({currentUser: {name: evt.target.value, id: userId}});

      // send the notification to the server to broadcast
      let msg = {
        type: 'postNotification',
        oldusername: oldusername,
        newusername: evt.target.value
      };
      this.sendMessageToServer({ message: msg });
      evt.target.value = '';
    }
  }

  render() {
    return (
      <div>
      <nav className='navbar'>
        <a href='/' className='navbar-brand'>Chatty</a>
        <span className='navbar-users'>
        {this.state.users} users online
        </span>
      </nav>
        <MessageList messages={this.state.messages} color={this.state.messages.userColor}/>
        <ChatBar currentUser={this.state.currentUser} addUserName={this.addUserName} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
