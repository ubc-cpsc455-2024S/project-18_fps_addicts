import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import RoomBookings from './pages/RoomBookings';
import MapInterface from './components/MapInterface';

const App = () => {
    return (
        <div>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/room-bookings" element={<RoomBookings />} />
            </Routes>
        </Router>
      
        </div>
    );
};

export default App;