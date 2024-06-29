// chatserver-generated
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const router = express.Router();
const server = http.createServer(router);
const io = socketIo(server);

let messages = {};
const welcomeMessage = { text: 'Welcome to the chat!', timestamp: new Date().toISOString() };

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', (pinId) => {
        socket.join(pinId);

        if (!messages[pinId]) {
            messages[pinId] = [];
            messages[pinId].push(welcomeMessage);
        }

        // Send the existing messages for the pin to the new client
        socket.emit('init', messages[pinId]);
    });
    

    // Listen for new messages from clients
    socket.on('message', (message) => {

        const { pinId } = message;

        if (!messages[pinId]) {
            messages[pinId] = [];
        }
        
        messages[pinId].push(message);
        io.emit('message', message); // Broadcast new message to all clients
    });

    socket.on('leave', (pinId) => {
        socket.leave(pinId);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});


module.exports = router;