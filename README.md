# TinyApp Project

- A client-side SPA (single-page app) built with ReactJS, based on HTML and CSS. Contains a chat log displaying messages and notifications. Contains an input field to change name and input field to send messages.
- This client-side app communicates with a server via WebSockets for multi-user real-time updates. No persistent database is involved; the focus is on the client-side experience.

## Final Product

- Allows the user to store the URLs and its shorten URLs, update them and delete them;
- Also the URLS pages and its functionalitys are only accessyble to the user that created them;

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Getting Started

- clone the repo
- Install all dependencies (using the `npm install` command).
- Start the client server:

  - npm install
  - npm start
  - open http://localhost:3000

- Start the main server:

  - cd chatty_server/
  - npm install
  - npm start
  - open http://localhost:3001

  Both of the servers should be running at the same time for it to work!

## Screenshots

First Client Connect
!['Screenshot of First Client Connect'](https://github.com/Lzduque/chatty-app/blob/master/docs/first-client-connect.png?raw=true)

First Client Message
!['Screenshot of First Client Message'](https://github.com/Lzduque/chatty-app/blob/master/docs/first-client-hi.png?raw=true)

First Client Change Name
!['Screenshot of First Client Change Name'](https://github.com/Lzduque/chatty-app/blob/master/docs/first-client-change-name.png?raw=true)

First Client Change Name Message
!['Screenshot of First Client Change Name Message'](https://github.com/Lzduque/chatty-app/blob/master/docs/first-client-name-message.png?raw=true)

Second Client Message
!['Screenshot of Second Client Message'](https://github.com/Lzduque/chatty-app/blob/master/docs/second-client-message.png?raw=true)

Second Client Change Name
!['Screenshot of Second Client Change Name'](https://github.com/Lzduque/chatty-app/blob/master/docs/second-client-change-name.png?raw=true)

Second Client Second Message
!['Screenshot of Second Client Second Message'](https://github.com/Lzduque/chatty-app/blob/master/docs/second-client-second-message.png?raw=true)

Third Client Message
!['Screenshot of Third Client Message'](https://github.com/Lzduque/chatty-app/blob/master/docs/third-client-message.png?raw=true)

First and Second Clients Window Side By Side - First Client Message
!['Screenshot of First Client Window'](https://github.com/Lzduque/chatty-app/blob/master/docs/first-and-second-clients-message.png?raw=true)

