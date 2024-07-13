import React from 'react';
import ChatBox from './Chatbox.jsx';

const DetailsPanel = ({ pin, onClose }) => {
    return (
        <div className="details-panel">
            <div className="details-content">
                {/* <h3>{pin.title}</h3> */}
                <p>{pin.details}</p>
                <p><b>Outlet availability:</b> {pin.power_port_availability}</p>
                <p><b>Lighting:</b> {pin.lighting}</p>
                <p><b>Capacity:</b> {pin.capacity}</p>
                <p><b>More info:</b> <a href={pin.link} target="_blank" rel="noopener noreferrer">Visit Link</a></p>
                <ChatBox pinId={pin.id} />
                <br></br>
                <br></br>
                {/* <button onClick={onClose}>Close</button> */}
          
            </div>
        </div>
    );
};

export default DetailsPanel;

