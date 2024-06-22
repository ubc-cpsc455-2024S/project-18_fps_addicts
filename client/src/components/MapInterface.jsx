import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import pins from '../assets/pinData.json';
import ChatBox from './Chatbox.jsx';
import DetailsPanel from './DetailsPanel.jsx';
import '../assets/leaflet.fullscreen-3.0.2/Control.FullScreen.css';
import '../assets/leaflet.fullscreen-3.0.2/Control.FullScreen.js';

const MapInterface = () => {
    const [selectedPin, setSelectedPin] = useState(null);

    const handleMoreDetailsClick = (pin) => {
        setSelectedPin(pin);
    };

    const closeDetailsPanel = () => {
        setSelectedPin(null);
    };

    return (
        <div className="map-interface">
            <div className="map-container">
                <MapContainer
                    center={[49.2606, -123.2460]} zoom={14} style={{ height: "700px", width: "50%" }}
                    fullscreenControl={true}
                    fullscreenControlOptions={{ position: 'topleft' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={19}
                    />
                    {pins.map(pin => (
                        <Marker key={pin.id} position={pin.position}>
                            <Popup>
                                <b>{pin.title}</b><br />{pin.description}
                                <br></br>
                                
                                <button onClick={() => handleMoreDetailsClick(pin)}>More Details</button>
                                {/* <ChatBox /> */}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            {selectedPin && (
                <div className="details-panel-container">
                    <DetailsPanel pin={selectedPin} onClose={closeDetailsPanel} />
                </div>
            )}
        </div>
    );
};

export default MapInterface;