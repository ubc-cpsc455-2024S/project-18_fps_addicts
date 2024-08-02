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
            <div className="panel" ref={el => panelRefs.current[0] = el}>
                <h3 className="about-page-text">What is UBC StudySpotter?</h3>  
                <br></br>
                <br></br>
                <p className='about-text'>
                Welcome to StudySpotter, the ultimate solution for UBC students 
                on the hunt for the perfect study spot! Say goodbye to the frustration 
                of wandering around campus looking for a place to study. Our app provides 
                real-time updates on the best study locations, complete with availability, amenities, and even local chatboxes 
                to connect with fellow students. With StudySpotter, you can effortlessly find and reserve your ideal study space, 
                ensuring you always have the perfect environment to hit the books and ace your exams. 
                Get ready to revolutionize your study sessions with StudySpotter!
                </p>
            </div>
            <div className="panel" ref={el => panelRefs.current[1] = el}>
                <h3 className="about-page-text">Explore and select waypoints!</h3>
                <img src={main} alt="main" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div className="panel" ref={el => panelRefs.current[2] = el}>
                <h3 className="about-page-text">Get information on the hottest study spots!</h3>
                <img src={waypoint} alt="waypoint" style={{ width: '100%', height: 'auto' }} />
            </div>
        </div>
    );
};

export default About;
