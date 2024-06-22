import React from 'react';
import ChatBox from './Chatbox.jsx';

const DetailsPanel = ({ pin, onClose }) => {
    return (
        <div className="details-panel">
            <div className="details-content">
                <h2>{pin.title}</h2>
                <p>{pin.details}</p>
                <ChatBox />
                <br></br>
                <br></br>
                <button onClick={onClose}>Close</button>
          
            </div>
        </div>
    );
};

export default DetailsPanel;

