import React from 'react';
import ChatBox from './Chatbox.jsx';

const DetailsPanel = ({ pin }) => {
    return (
        <div className="details-panel">
            <div className="details-content">

                {/* <h3>{pin.title}</h3>
                <p>{pin.details}</p> */}
                <ChatBox pinId={pin.id} />
                {/* <br></br>
                <br></br>
                <button onClick={onClose}>Close</button> */}
          
            </div>
        </div>
    );
};

export default DetailsPanel;

