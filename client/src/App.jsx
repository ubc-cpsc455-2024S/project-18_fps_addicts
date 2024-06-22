import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import RoomBookings from './pages/RoomBookings';
import Footer from './components/Footer';
import Login from './pages/Login';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';

const App = () => {
    const [displayNav, setDisplayNav] = useState(false)
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
      document.body.classList.toggle('dark-mode', darkMode); 
    };

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
                    <RxHamburgerMenu className='burger' onClick={() => setDisplayNav(!displayNav)}/>
                </header>
                <NavBar display={displayNav}/>
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