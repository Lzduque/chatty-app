import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

{/*needs function*/}
class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: []
    };
  }

  sendMessageToServer = (msg) => {
    this.socket.send(JSON.stringify(msg));
    console.log("JSON.stringify(msg): ", JSON.stringify(msg));
  }

  addMessage = (evt) => {
    if (evt.key === 'Enter') {

      let msg = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: evt.target.value
      };
      console.log('evt.target.value', evt.target.value);

      // Send the msg object as a JSON-formatted string.
      this.sendMessageToServer({ message: msg });
      console.log("msg: ", msg);
      evt.target.value = '';
    }
  };

  addUserName = (evt) => {
    const oldusername = this.state.currentUser.name;

    if (evt.key === 'Enter') {
      this.setState({currentUser: {name: evt.target.value}});
      console.log('this.state: ',this.state);
      console.log('evt.target.value: ',evt.target.value);

      let msg = {
        type: "postNotification",
        oldusername: oldusername,
        newusername: evt.target.value
      };
      console.log('msg: ',msg);
      this.sendMessageToServer({ message: msg });

      evt.target.value = '';
    }
  }

  componentDidMount = () => {
    console.log("componentDidMount <App />");
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    };
    this.socket.onmessage = (evt) => {
      console.log('event reciving: ',evt);
      console.log('event.data reciving: ',evt.data);
      console.log('JSON.parse(event.data): ',JSON.parse(evt.data));

      // const data = JSON.parse(event.data);
      // switch(data.type) {
      //   case "incomingMessage":
      //     // handle incoming message
      //     break;
      //   case "incomingNotification":
      //     // handle incoming notification
      //     break;
      //   default:
      //     // show an error in the console if the message type is unknown
      //     throw new Error("Unknown event type " + data.type);
      // }

      this.setState({ messages: this.state.messages.concat(JSON.parse(evt.data).message)});
    }
  }

//   <div className="message system">
//   Anonymous1 changed their name to nomnom.
// </div>

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} addUserName={this.addUserName} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
