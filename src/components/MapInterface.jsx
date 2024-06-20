import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import pins from '../assets/pinData.json';
import ChatBox from './Chatbox.jsx';



const MapInterface = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MapContainer center={[49.2606, -123.2460]} zoom={14} style={{ height: "700px", width: "50%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                />
                {pins.map(pin => (
                    <Marker key={pin.id} position={pin.position}>
                        <Popup>
                            <b>{pin.title}</b><br />{pin.description}
                            <ChatBox />
                        </Popup>
                        
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapInterface;
