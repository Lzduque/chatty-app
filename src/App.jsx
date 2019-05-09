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
      messages: [],
      users: 0
    };
  }

  sendMessageToServer = (msg) => {
    this.socket.send(JSON.stringify(msg));
    // console.log("JSON.stringify(msg): ", JSON.stringify(msg));
  }

  addMessage = (evt) => {
    if (evt.key === 'Enter') {

      let msg = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: evt.target.value
      };
      // console.log('evt.target.value', evt.target.value);

      // Send the msg object as a JSON-formatted string.
      this.sendMessageToServer({ message: msg });
      // console.log("msg: ", msg);
      evt.target.value = '';
    }
  };

  addUserName = (evt) => {
    const oldusername = this.state.currentUser.name;

    if (evt.key === 'Enter') {
      this.setState({currentUser: {name: evt.target.value}});
      // console.log('this.state: ',this.state);
      // console.log('evt.target.value: ',evt.target.value);

      let msg = {
        type: "postNotification",
        oldusername: oldusername,
        newusername: evt.target.value
      };
      // console.log('msg: ',msg);
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
      // console.log('event reciving: ',evt);
      console.log('event.data reciving: ',evt.data);
      console.log('typeof(evt.data): ', typeof(evt.data));
      // console.log('JSON.parse(event.data): ',JSON.parse(evt.data));

      if (evt.data.startsWith('#')) {
        this.setState({ color: evt.data });
        console.log('evt.data - color: ', evt.data);
      } else if (evt.data == parseInt(evt.data)) {
        this.setState({ users: evt.data });
        console.log('evt.data - users: ', evt.data);
      } else {
        this.setState({ messages: this.state.messages.concat(JSON.parse(evt.data).message)});
        console.log('this.state: ',this.state)
      };
    }
  }


  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-users">
        {this.state.users} users online
        </span>
      </nav>
      <MessageList messages={this.state.messages} color={this.state.color}/>
      <ChatBar currentUser={this.state.currentUser} addUserName={this.addUserName} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
