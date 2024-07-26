import React, { useState } from 'react';
{/*chat-generated */}
const ChatMessages = ({ messages, onEdit, onDeleteMessage }) => {
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editText, setEditText] = useState('');

    const userId = localStorage.getItem('userId'); // Retrieve the current user's ID

    const handleEditClick = (message) => {
        if (!message.editable || message.userId !== userId) return;
        setEditingMessageId(message.id);
        setEditText(message.text);
    };

    const handleSaveClick = (message) => {
        onEdit(message.id, editText);
        setEditingMessageId(null);
        setEditText('');
    };

    return (
        <div className="chat-messages">
            {messages.map((msg, index) => {
                const isCurrentUser = msg.userId === userId;
                const messageStyle = isCurrentUser ? { backgroundColor: '#87CEEB' } : { backgroundColor: '#ffffff' };

                const messageContent = editingMessageId === msg.id ? (
                    <>
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                        />
                        <button className="saveButton"  onClick={() => handleSaveClick(msg)}>Save</button>
                        <button className="cancelButton"  onClick={() => setEditingMessageId(null)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <span className="message-text">{msg.text}</span>
                        <span className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        {isCurrentUser && msg.editable && (
                            <>
                                <button className="editButton" id="userActionForChat" onClick={() => handleEditClick(msg)}>Edit</button>
                                <button className="deleteButton" onClick={() => onDeleteMessage(msg.id)}>Delete</button>
                            </>
                        )}
                    </>
                );

                return (
                    <div key={index} className="chat-message" style={messageStyle}>
                        {messageContent}
                    </div>
                );
            })}
        </div>
    );
};

export default ChatMessages;