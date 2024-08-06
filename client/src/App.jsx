import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import RoomBookings from './pages/RoomBookings';
import Footer from './components/Footer';
import Profile from './pages/Profile.jsx';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import io from 'socket.io-client';
import logo from './assets/ubcspotter-logo-final.png';
import './App.css';
import {useAuthPersistence} from "./useAuthPersistence.js";

const App = () => {
    useAuthPersistence();
    const [displayNav, setDisplayNav] = useState(false);
    const [serverIp, setServerIp] = useState('');
    const [darkMode, setDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        return savedDarkMode === 'true' || (savedDarkMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
    }, []);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);


    // "port generated" - see chatserver.js
    useEffect(() => {
        const initialSocket = io('https://ubcstudyspotterserver.onrender.com'); // Initial connection to get server IP

        initialSocket.on('serverIp', (ip) => {
            setServerIp(ip); // Update state with server IP
            initialSocket.disconnect(); // Disconnect initial socket
        });

        return () => {
            initialSocket.disconnect();
        };
    }, []);

    // "port generated"
    useEffect(() => {
        if (serverIp) {
            const socket = io('https://ubcstudyspotterserver.onrender.com');
            socket.on('connect', () => {
                console.log('Connected to server');
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [serverIp]);

    const toggleNavBar = () => {
        setDisplayNav(false);
    };


    return (
        <div>
            <Router>
                <header className='title'>

                    <div className="logo-container">
                    <img className="ubc-logo" src={logo} alt="studyspotter" style={{ width: '400px', height: 'auto' }} />
                    </div>
                </header>
                <header className="App-header">
                    <RxHamburgerMenu className='burger' onClick={() => setDisplayNav(!displayNav)} />
                    <button className="mode-toggle" onClick={toggleDarkMode}>
                        {darkMode ? <FiSun /> : <FiMoon />}
                    </button>
                </header>
                <NavBar display={displayNav} hideNavBar={toggleNavBar} />
                <div className={`content ${displayNav ? 'shifted' : ''}`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/room-bookings" element={<RoomBookings />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                    
                </div>
            </Router>
            {/*<div id="signInDiv"></div>*/}
        </div>
    );
};

export default App;