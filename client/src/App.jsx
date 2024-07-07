import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import RoomBookings from './pages/RoomBookings';
import Footer from './components/Footer';
import Login from './pages/Login';
import { RxHamburgerMenu } from "react-icons/rx";
import { jwtDecode } from 'jwt-decode';

const App = () => {
    const [displayNav, setDisplayNav] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', darkMode); 
    };

    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT token: " + response.credential);
        const userObject = jwtDecode(response.credential);
        console.log(userObject);
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "761190464142-13nrmtjol14dcbpuj8smo3f4cqubhkvt.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );
    }, []);

    return (
        <div>
            <Router>
                <header className='title'>
                    <h1 className="typewriter">UBC StudySpotter</h1>
                    <button className="mode-toggle" onClick={toggleDarkMode}>
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
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
            <div id="signInDiv"></div>
        </div>
    );
};

export default App;