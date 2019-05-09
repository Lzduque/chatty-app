const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');// Generate a v1 UUID (time-based)

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localcd ..host', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server:
const wss = new SocketServer({ server });

// variables to store color and user id
const colorArray = ['#FF00FF', '#0000FF', '#00FFFF', '#FF6C16'];
let clientsArray = [];

// When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');

  // update the connected user number
  wss.clients.forEach(function each(client) {
    client.send(wss.clients.size);
  });

  // broadcasting
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(data));
    });
  };

  // everytime a message comes --> parse it, check to see what kind of message it is
  client.on('message', (incomingMessage) => {

    const receivedMessage = JSON.parse(incomingMessage);

    // check to see if it is a message or just the userId
    if (!receivedMessage.message) {
      clientsArray.push({ userId: receivedMessage.userId ,
                          userColor: colorArray[Math.floor(Math.random() * colorArray.length)]});
      return;
    }

    // look for a userId that is equal to the one in the message and apply the correct color
    for (let i = 0; i < clientsArray.length ; i++) {
      if (clientsArray[i].userId === receivedMessage.message.userId) {
        receivedMessage.message.userColor = clientsArray[i].userColor;
      }
    }

    // apply a message id
    receivedMessage.message.id = uuidV1();

    // change the message status depending to the type of the message
    switch (receivedMessage.message.type) {
      case 'postMessage':
        receivedMessage.message.type = 'incomingMessage';
        break;
      case 'postNotification':
        receivedMessage.message.type = 'incomingNotification';
        break;
    }

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