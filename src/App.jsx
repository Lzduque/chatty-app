import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

{/*needs function*/}
class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
  }

  sendMessageToServer = (msg) => {
    this.socket.send(JSON.stringify(msg));
    console.log("JSON.stringify(msg): ", JSON.stringify(msg));
  }

  addMessage = (evt) => {
    if (evt.key === 'Enter') {
      let oldMessages = this.state.messages;
      let newMessages = [
        ...oldMessages,
        {
          id: this.state.messages.length + 1,
          username: this.state.currentUser.name,
          content: evt.target.value
        }
      ];
      this.setState({ messages: newMessages });

      let msg = {
        type: 'message',
        username: this.state.currentUser.name,
        content: evt.target.value
      };

      // Send the msg object as a JSON-formatted string.
      this.sendMessageToServer({message: msg});
      console.log("msg: ", msg);

      evt.target.value = '';
      console.log("oldMessages: ", oldMessages);
      console.log("newMessages: ", newMessages);
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.onopen = function (event) {
      console.log('Connected to server');
    };
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
