const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');// Generate a v1 UUID (time-based)

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localcd ..host', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server:
const wss = new SocketServer({ server });

const colorArray = ['#FF00FF', '#0000FF', '#00FFFF', '#FFFF00'];
let clientsArray = [];
console.log('clientsArray: ',clientsArray);

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');

  wss.clients.forEach(function each(client) {
    client.send(wss.clients.size);
    // console.log('client: ',client);
    // console.log('wss.clients: ',wss.clients);
  });

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(data));
      // console.log('data sent to client from servers', data);
    });
  };

  client.on('message', (incomingMessage) => {

    const receivedMessage = JSON.parse(incomingMessage);
    console.log('incomingMessage:', incomingMessage);
    console.log('receivedMessage:', receivedMessage);

    if (!receivedMessage.message) {
      clientsArray.push({ userId: receivedMessage.userId ,
                          userColor: colorArray[Math.floor(Math.random() * colorArray.length)]});
      console.log('clientsArray: ',clientsArray);
      return
    }

    console.log('receivedMessage.message.type:', receivedMessage.message.type);

    receivedMessage.message.id = uuidV1();

    for (let i = 0; i < clientsArray.length ; i++) {
      if (clientsArray[i].userId === receivedMessage.message.userId) {
        receivedMessage.message.userColor = clientsArray[i].userColor;
      }
    }
    console.log('clientsArray: ',clientsArray);

    switch (receivedMessage.message.type) {
      case 'postMessage':
        receivedMessage.message.type = 'incomingMessage';
        break;
      case 'postNotification':
        receivedMessage.message.type = 'incomingNotification';
        break;
    }
    console.log('receivedMessage id and type:', receivedMessage);
    wss.broadcast(receivedMessage);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach(function each(client) {
      client.send(wss.clients.size);
    });
  });
});