import React from 'react';
import '../App.css';

const Footer = () => {
    return (
        <footer className="copyright-footer">
            <p>&copy; {new Date().getFullYear()} StudySpotter. All rights reserved. | Contact Use @ studyspotterubc@gmail.com</p>
        </footer>
    );
};

export default Footer;

