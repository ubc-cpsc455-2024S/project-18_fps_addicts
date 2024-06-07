import React from 'react';

const About = () => {
    return (
        <div>
            <h1>About/User Manual</h1>
            {/* Add information about the app and how to use it */}
            <div className="about">
            <p >Welcome to StudySpotter! UBC's hottest study spot finder. StudySpotter is an app that facilitates
                the location and reservation of study spots on campus. Users will be able to view a map, check out amenities, 
                and reserve spaces that will fit their needs.

                To get started, select any waypoint on the map. This will tell you basic information about that point.
                Upon selection, a pop-up will appear and display all amenities available at that location along with
                the option to book private rooms via a link.
            </p>
            </div>
        </div>
    );
};

export default About;