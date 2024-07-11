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
import {jwtDecode} from "jwt-decode";

const App = () => {
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

    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT token: " + response.credential);
        const userObject = jwtDecode(response.credential);
        console.log(userObject);
    };

    // useEffect(() => {
    //     /* global google */
    //     google.accounts.id.initialize({
    //         client_id: "761190464142-13nrmtjol14dcbpuj8smo3f4cqubhkvt.apps.googleusercontent.com",
    //         callback: handleCallbackResponse
    //     });
    //
    //     google.accounts.id.renderButton(
    //         document.getElementById("signInDiv"),
    //         { theme: "outline", size: "large" }
    //     );
    // }, []);



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
            {/*<div id="signInDiv"></div>*/}
        </div>
    );
};

export default App;