// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { FaStar, FaRegStar } from 'react-icons/fa';
// import 'leaflet/dist/leaflet.css';
// import pins from '../assets/pinData.json';
// import ChatBox from './Chatbox.jsx';
// import '../assets/leaflet.fullscreen-3.0.2/Control.FullScreen.css';
// import '../assets/leaflet.fullscreen-3.0.2/Control.FullScreen.js';

// const MapInterface = () => {
//     const [detailsVisible, setDetailsVisible] = useState(false);
//     const [selectedPin, setSelectedPin] = useState(null);
//     const [favorites, setFavorites] = useState([]);
//     const [mapCenter] = useState([49.2606, -123.2460]); // Default center
//     const [mapZoom] = useState(14); // Default zoom

//     const handleMoreDetails = (pin) => {
//         setSelectedPin(pin);
//         setDetailsVisible(true);
//     };

//     const handleCloseDetails = () => {
//         setDetailsVisible(false);
//         setSelectedPin(null);
//     };

//     const toggleFavorite = (pinId) => {
//         setFavorites(prevFavorites => {
//             if (prevFavorites.includes(pinId)) {
//                 return prevFavorites.filter(id => id !== pinId);
//             } else {
//                 return [...prevFavorites, pinId];
//             }
//         });
//     };

//     return (
//         <div className="map-interface">
//             <div className="map-container">
//                 <MapContainer
//                     center={mapCenter}
//                     zoom={mapZoom}
//                     style={{ height: "700px", width: "100%" }}
//                     fullscreenControl={true}
//                     fullscreenControlOptions={{ position: 'topleft' }}
//                 >
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         maxZoom={19}
//                     />
//                     {pins.map(pin => (
//                         <Marker key={pin.id} position={pin.position}>
//                             <Popup>
//                                 <div className="popup-content">
//                                     <b>{pin.title}</b><br />{pin.description}
//                                     <br></br>
//                                     <br></br>
//                                     <button onClick={() => handleMoreDetails(pin)}>More Details</button>
//                                     {/* <ChatBox /> */}
//                                     <div className="favorite" onClick={() => toggleFavorite(pin.id)}>
//                                         {favorites.includes(pin.id) ? <FaStar /> : <FaRegStar />}
//                                     </div>
//                                 </div>
//                             </Popup>
//                         </Marker>
//                     ))}
//                 </MapContainer>
//             </div>
//             {detailsVisible && selectedPin && (
//                 <div className="overlay" onClick={handleCloseDetails}>
//                     <div className="details-panel" onClick={(e) => e.stopPropagation()}>
//                         <h2>{selectedPin.title}</h2>
//                         <p>{selectedPin.description}</p>
//                         <ChatBox />
//                         <button onClick={handleCloseDetails}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MapInterface;

import React, { useLayoutEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaStar, FaRegStar } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
// import pins from '../assets/pinData.json';
import pins from '../assets/updated-waypoints.json'
// import ChatBox from './Chatbox.jsx';
import DetailsPanel from './DetailsPanel.jsx';
//import '../assets/leaflet.fullscreen-3.0.2/Control.FullScreen.css';
//import '../assets/leaflet.fullscreen-3.0.2/Control.FullScreen.js';

const MapInterface = () => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selectedPin, setSelectedPin] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [mapCenter] = useState([49.2606, -123.2460]); // Default center
    const [mapZoom] = useState(14); // Default zoom
    const [searchTerm, setSearchTerm] = useState('');

    const handleMoreDetails = (pin, point) => {
        setSelectedPin(pin);
        setDetailsVisible(true);
    };

    const handleCloseDetails = () => {
        setDetailsVisible(false);
        setSelectedPin(null);
    };

    const toggleFavorite = (pinId) => {
        setFavorites(prevFavorites => {
            if (prevFavorites.includes(pinId)) {
                return prevFavorites.filter(id => id !== pinId);
            } else {
                return [...prevFavorites, pinId];
            }
        });
    };

    // Filter pins based on search term
    const filteredPins = pins.filter(pin =>
        pin.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="map-interface">
            <div className="map-container">
                 <div className="search-container">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search by Building Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: "700px", width: "100%" }}
                    //fullscreenControl={true}
                    //fullscreenControlOptions={{ position: 'topleft' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={19}
                    />
                    {filteredPins.map(pin => (
                        <Marker key={pin.id} position={pin.coordinates}>
                            <Popup>
                                <div className="popup-content">
                                    <b>{pin.title}</b><br />{pin.description}
                                    <br></br>
                                    <br></br>
                                    <button onClick={() => handleMoreDetails(pin)}>More Details</button>
                                    {/* <ChatBox /> */}
                                    <div className="favorite" onClick={() => toggleFavorite(pin.id)}>
                                        {favorites.includes(pin.id) ? <FaStar /> : <FaRegStar />}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))};
                </MapContainer>
            </div>
            {detailsVisible && selectedPin && (
                <div className="overlay" onClick={handleCloseDetails}>
                    <div className="details-panel" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedPin.title}</h2>
                        <p>{selectedPin.description}</p> 
                        {selectedPin.imageUrl && <img src={selectedPin.imageUrl} alt={selectedPin.title} style={{ width: '100%', height: 'auto' }} />}
                        <label><strong>Capacity:</strong> {selectedPin.capacity}</label> 
                        <br></br>
                        <br></br>
                        <a className='details-link' href={selectedPin.link}>Click for more info!</a>


                            <div className="details-panel-container">
                            <DetailsPanel pin={selectedPin} onClose={handleCloseDetails} />
                            </div>
                            {/* <ChatBox /> */}

                        <button onClick={handleCloseDetails}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapInterface;
