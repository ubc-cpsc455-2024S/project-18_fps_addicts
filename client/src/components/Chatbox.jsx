import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatInput from './ChatInput.jsx';
import ChatMessages from './ChatMessages.jsx';
import { v4 as uuidv4 } from 'uuid';



// const socket = io('http://localhost:4000', {
//     transports: ['websocket', 'polling', 'flashsocket']
// });


{/* stuff marked with "chat-generated" was generated by ChatGTP on June 20st, 2024'
          The prompt used was: how to make a local chatbox in react
         since inital genration has been heavily modified toi fit the needs of the porject*/}
{/* stuff marked with "chatserver-generated" was generated by ChatGTP on June 22nd, 2024'
          The prompt used was: how to make a local chatbox appear on other local intances.
         modifcations were made to intergrate it to the porject, put most of the structure remains intact */}

const socket = io('https://ubcstudyspotterserver.onrender.com', {
    transports: ['websocket', 'polling', 'flashsocket']
});

const userId = localStorage.getItem('userId') || uuidv4();
localStorage.setItem('userId', userId);

const ChatBox = ({ pinId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit('join', { pinId, userId });

        socket.on('init', (initialMessages) => {
            const parsedMessages = initialMessages.map((msg) => ({
                ...msg,
                timestamp: new Date(msg.timestamp)
            }));
            setMessages(parsedMessages);
        });

        socket.on('message', (message) => {
            const parsedMessage = {
                ...message,
                timestamp: new Date(message.timestamp)
            };
            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        });

        socket.on('edit-message', (editedMessage) => {
            const parsedMessage = {
                ...editedMessage,
                timestamp: new Date(editedMessage.timestamp)
            };
            setMessages((prevMessages) =>
                prevMessages.map((msg) => (msg.id === editedMessage.id ? parsedMessage : msg))
            );
        });

        socket.on('delete-message', ({ messageId }) => {
            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg.id !== messageId)
            );
        });

        return () => {
            socket.emit('leave', pinId);
            socket.off('init');
            socket.off('message');
            socket.off('edit-message');
            socket.off('delete-message');
        };
    }, [pinId]);

    const addMessage = (message) => {
        const newMessage = { ...message, id: uuidv4(), pinId, userId, editable: true };
        socket.emit('message', newMessage);
    };

    const editMessage = (messageId, newText) => {
        const editedMessage = {
            id: messageId,
            text: newText,
            timestamp: new Date().toISOString(),
            pinId,
            userId, 
            editable: true
        };
        socket.emit('edit-message', editedMessage);
    };

    const deleteMessage = (messageId) => {
        socket.emit('delete-message', { pinId, messageId, userId });
    };

    return (
        <div className="chat-box">
            <ChatMessages messages={messages} onEdit={editMessage} onDeleteMessage={deleteMessage} />
            <ChatInput addMessage={addMessage} />
        </div>
    );
};

export default ChatBox;