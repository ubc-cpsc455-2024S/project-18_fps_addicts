import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import RoomBookings from './pages/RoomBookings';
import MapInterface from './components/MapInterface';
import Footer from './components/Footer';
import Login from './pages/Login';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';

const App = () => {
    const [displayNav, setDisplayNav] = useState(false)

    return (
        <div>
            <Router>
                <header className="App-header">
                    <RxHamburgerMenu onClick={() => setDisplayNav(!displayNav)}/>
                    {/* <h1 className="typewriter">UBC StudySpotter</h1> */}
                </header>
                <NavBar display={displayNav}/>
                <div className='content'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/room-bookings" element={<RoomBookings />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </Router>
            <Footer />
        </div>
    );
};

export default App;