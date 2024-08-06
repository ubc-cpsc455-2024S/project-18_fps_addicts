import React from 'react';
import MapInterface from '../components/MapInterface';
import Footer from './components/Footer';

const Home = () => {
    return (
        <div>
            <h1>Discover UBC's Hottest Study Spots!</h1>
            <h3>Search by building name or interact with the map to get started</h3>
            <MapInterface />
            <Footer />
        </div>
    );
};

export default Home;