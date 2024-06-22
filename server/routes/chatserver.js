// chatserver-generated
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const router = express.Router();
const server = http.createServer(router);
const io = socketIo(server);

let messages = [];
const welcomeMessage = { text: 'Welcome to the chat!', timestamp: new Date().toISOString() };

io.on('connection', (socket) => {
    console.log('New client connected');

    //socket.emit('message', welcomeMessage);

    // Send the existing messages to the new client
    //socket.emit('init', messages);

    // socket.emit('message', welcomeMessage);
    

    // Listen for new messages from clients
    socket.on('message', (message) => {
        
        messages.push(message);
        io.emit('message', message); // Broadcast new message to all clients
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});


module.exports = router;