import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

{/*needs function*/}
class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  sendMessageToServer = (msg) => {
    this.socket.send(JSON.stringify(msg));
    console.log("JSON.stringify(msg): ", JSON.stringify(msg));
  }

  addMessage = (evt) => {
    if (evt.key === 'Enter') {

      let msg = {
        username: this.state.currentUser.name,
        content: evt.target.value
      };

      // Send the msg object as a JSON-formatted string.
      this.sendMessageToServer({ message: msg });
      console.log("msg: ", msg);

      evt.target.value = '';
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    };
    this.socket.onmessage = (evt) => {
      console.log('event: ',evt);
      console.log('event.data: ',evt.data);
      console.log('JSON.parse(event.data): ',JSON.parse(evt.data));
      // console.log('this: ',this);
      // console.log('this.state: ',this.state);

      this.setState({ messages: this.state.messages.concat(JSON.parse(evt.data).message)});
    }
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
