import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import RoomBookings from './pages/RoomBookings';
import Footer from './components/Footer';
import Login from './pages/Login';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import io from 'socket.io-client';
import './App.css';

const App = () => {
    const [displayNav, setDisplayNav] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [serverIp, setServerIp] = useState('');

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    // "port generated" - see chatserver.js
    useEffect(() => {
        const initialSocket = io('http://localhost:4000'); // Initial connection to get server IP
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
            const socket = io(`http://${serverIp}:4000`);
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


    return (
        <div>
            <Router>
                <header className='title'>

                    <h1 className="typewriter">UBC StudySpotter</h1>
                    <button className="mode-toggle" onClick={toggleDarkMode}>
                        {darkMode ? <FiSun /> : <FiMoon />}
                    </button>
                </header>
                <header className="App-header">
                    <RxHamburgerMenu className='burger' onClick={() => setDisplayNav(!displayNav)} />
                </header>
                <NavBar display={displayNav} />
                <div className={`content ${displayNav ? 'shifted' : ''}`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/room-bookings" element={<RoomBookings />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </div>
    );
};

export default App;