import React from 'react';

const StudySpotPin = ({ spot }) => {
    return (
        <div>
            <h3>{spot.name}</h3>
            <p>{spot.description}</p>
            {/* Additional information and functionality can go here */}
        </div>
    );
};

export default StudySpotPin;