import React from 'react';
{/*chat-generated */}
const ChatMessages = ({ messages }) => {
    return (
        <div className="chat-messages">
            {messages.map((msg, index) => (
                <div key={index} className="chat-message">
                    <span className="message-text">{msg.text}</span>
                    <span className="message-timestamp">{msg.timestamp.toLocaleTimeString()}</span>
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;