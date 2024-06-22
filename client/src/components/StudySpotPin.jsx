import React from 'react';

const StudySpotPin = ({ spot }) => {
    return (
        <div>
            <h3>{spot.name}</h3>
            <p>{spot.description}</p>
            <p>{spot.power_port_availability}</p>
            <p>{spot.lighting}</p>
            <p>{spot.capacity}</p>
            {/* Additional information and functionality can go here */}
        </div>
    );
};

export default StudySpotPin;

// https://www.reddit.com/r/UBC/comments/17ey46y/study_spots_review_pt_1/ 
// https://www.reddit.com/r/UBC/comments/18bocjw/study_spots_review_pt_2/
// https://www.reddit.com/r/UBC/comments/198a60t/study_spots_review_pt_3/ 
