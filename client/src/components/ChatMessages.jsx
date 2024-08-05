import React, { useState } from 'react';
{/*chat-generated: see Chatbox.jsx */}
const ChatMessages = ({ messages, onEdit, onDeleteMessage }) => {

    //usisng the id of the messageID, save the new text from an editited message to be sent to the server
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editText, setEditText] = useState('');

    // Retrieve the current user's ID
    const userId = localStorage.getItem('userId'); 

    //only allow owner of message to edit it
    const handleEditClick = (message) => {
        if (!message.editable || message.userId !== userId) return;
        setEditingMessageId(message.id);
        setEditText(message.text);
    };

    //handles the save button when a message is edited. 
    const handleSaveClick = (message) => {
        onEdit(message.id, editText);
        setEditingMessageId(null);
        setEditText('');
    };

    return (
        <div className="chat-messages">
            {messages.map((msg, index) => {
                const isCurrentUser = msg.userId === userId;
                // if a message belongs to the owner, display the buttons to edit, save, delete, and cancel edit buttons.
                //otherwise show a plain message sent by others. 
                const messageStyle = isCurrentUser ? { backgroundColor: '#97D4E9' } : { backgroundColor: '#ffffff' };
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