import React from 'react';
import ChatBox from './Chatbox.jsx';

const DetailsPanel = ({ pin }) => {
    return (
        <div className="details-panel">
            <div className="details-content">

                <ChatBox pinId={pin.id} />
          
            </div>
        </div>
    );
};

export default DetailsPanel;


