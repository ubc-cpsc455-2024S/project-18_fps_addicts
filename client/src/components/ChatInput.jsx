import React, { useState } from 'react';
{/*chat-generated */}
{/*chatserver-generated*/}
const ChatInput = ({ addMessage }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            addMessage({ text: input, timestamp: new Date().toISOString() });
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="chat-input">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default ChatInput;