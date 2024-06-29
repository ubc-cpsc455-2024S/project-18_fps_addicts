// chatserver-generated
// Basic inspriation: https://socket.io/how-to/use-with-react
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const os = require('os');
const cors = require('cors');
const router = express();
 // "start": "node ./bin/www" - old package start

router.use(cors());

const server = http.createServer(router);

let messages = {};
const welcomeMessage = { text: 'Welcome to the chat!', timestamp: new Date().toISOString() };

io.on('connection', (socket) => {
    console.log('New client connected');
    console.log(localIpAddress);

    socket.on('join', (pinId) => {
        socket.join(pinId);

        if (!messages[pinId]) {
            messages[pinId] = [];
            messages[pinId].push(welcomeMessage);
        }

        // Send the existing messages for the pin to the new client
        socket.emit('init', messages[pinId]);
    });
    

    socket.on('join', (pinId) => {
        socket.join(pinId);

        if (!messages[pinId]) {
            messages[pinId] = [welcomeMessage];
        }

        socket.emit('init', messages[pinId]);
    });

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

server.listen(4000, '0.0.0.0', () => {
    console.log('Server is running on port 4000');
});


module.exports = router;