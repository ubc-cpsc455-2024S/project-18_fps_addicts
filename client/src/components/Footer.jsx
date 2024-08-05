import React from 'react';
import '../App.css';

const Footer = () => {
    return (
        <footer className="copyright-footer">
            <p>&copy; {new Date().getFullYear()} StudySpotter. All rights reserved. | Contact Us: studyspotterubc@gmail.com</p>
        </footer>
    );
};

export default Footer;

