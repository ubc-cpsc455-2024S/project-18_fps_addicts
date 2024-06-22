import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import pins from '../assets/pinData.json';
import ChatBox from './Chatbox.jsx';
import '../assets/leaflet.fullscreen-3.0.2/Control.FullScreen.css';
import '../assets/leaflet.fullscreen-3.0.2/Control.FullScreen.js';


const MapInterface = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                        <b>{pin.title}</b>
                        <br />{pin.description}
                        <br />
                        <br /><strong>Outlet Availability:</strong> {pin.power_port_availability}
                        <br /><strong>Lighting:</strong> {pin.lighting}
                        <br /><strong>Capacity:</strong> {pin.capacity}
                        <br /><strong>More info:</strong> <a href={pin.link} target="_blank" rel="noopener noreferrer">Click here</a>
                        
                        <ChatBox />
                        </Popup>
                        
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapInterface;
