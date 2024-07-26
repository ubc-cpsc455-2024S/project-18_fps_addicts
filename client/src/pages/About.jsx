// import React from 'react';
// import main from '../assets/main.png';

// const About = () => {
//     return (
//         <div>
//             <h1>About UBC StudySpotter</h1>
//             {/* Add information about the app and how to use it */}
//             <div className="about">
//             <p> Welcome to StudySpotter! UBC's hottest study spot finder. StudySpotter is an app that facilitates
//                 the location and reservation of study spots on campus. Users will be able to view a map, check out amenities, 
//                 and reserve spaces that will fit their needs.

//                 To get started, select any waypoint on the map. This will tell you basic information about that point.
//                 Upon selection, a pop-up will appear and display all amenities available at that location along with
//                 the option to book private rooms via a link.
//             </p>
//             </div>
//             <div className="panel">
//                 <img src={main} alt="main" style={{ width: '100%', height: 'auto' }} />
//             </div>
//             <div className="panel">
//             </div>
//         </div>
//     );
// };

// export default About;
import React, { useEffect, useRef } from 'react';
import main from '../assets/main.png';
import waypoint from '../assets/waypoint.png';

const About = () => {
    const panelRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        panelRefs.current.forEach(panel => {
            if (panel) {
                observer.observe(panel);
            }
        });

        return () => {
            panelRefs.current.forEach(panel => {
                if (panel) {
                    observer.unobserve(panel);
                }
            });
        };
    }, []);

    return (
        <div>
            <h1>About UBC StudySpotter</h1>
            {/* <div className="about">
                <p> Welcome to StudySpotter! UBC's hottest study spot finder. StudySpotter is an app that facilitates
                    the location and reservation of study spots on campus. Users will be able to view a map, check out amenities, 
                    and reserve spaces that will fit their needs.

                    To get started, select any waypoint on the map. This will tell you basic information about that point.
                    Upon selection, a pop-up will appear and display all amenities available at that location along with
                    the option to book private rooms via a link.
                </p>
            </div> */}
            <div className="panel" ref={el => panelRefs.current[0] = el}>
                <h3 className="about-page-text">Explore and select waypoints!</h3>
                <img src={main} alt="main" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div className="panel" ref={el => panelRefs.current[1] = el}>
                <h3 className="about-page-text">Get information on the hottest study spots!</h3>
                <img src={waypoint} alt="waypoint" style={{ width: '100%', height: 'auto' }} />
            </div>
        </div>
    );
};

export default About;
