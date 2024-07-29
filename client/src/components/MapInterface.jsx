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

import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Tooltip,
} from "react-leaflet";
import { FaStar, FaRegStar } from "react-icons/fa";

//import 'leaflet/dist/leaflet.css';
// import pins from '../assets/pinData.json';
import pins from "../assets/updated-waypoints.json";
// import ChatBox from './Chatbox.jsx';
import DetailsPanel from "./DetailsPanel.jsx";
//import '../assets/leaflet.fullscreen-3.0.2/Control.FullScreen.css';
//import '../assets/leaflet.fullscreen-3.0.2/Control.FullScreen.js';

const MapInterface = () => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selectedPin, setSelectedPin] = useState(null);
    const [mapCenter] = useState([49.2606, -123.246]);
    const [mapZoom] = useState(14);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [distance, setDistance] = useState(null);
    const [isDistanceActive, setIsDistanceActive] = useState(false);

  const handleMoreDetails = (pin, point) => {
    setSelectedPin(pin);
    setDetailsVisible(true);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(false);
    setSelectedPin(null);
  };

  useEffect(() => {
    console.log("Selected Points in useEffect:", selectedPoints);
    if (selectedPoints.length === 2) {
      const dist = haversineDistance(selectedPoints[0], selectedPoints[1]);
      setDistance(dist);
      console.log("Distance Calculated:", dist);
    }
  }, [selectedPoints]);
  

  const handleMapClick = event => {
    if (!isDistanceActive) return;
    const newPoint = [event.latlng.lat, event.latlng.lng];
  
    setSelectedPoints(prevPoints => {
      if (prevPoints.length < 1) {
        return [newPoint];
      } else if (prevPoints.length === 1) {
        const newPoints = [...prevPoints, newPoint];
        const dist = haversineDistance(prevPoints[0], newPoint);
        setDistance(dist);
        console.log("New Points:", newPoints, "Distance:", dist);
        return newPoints;
      } else {
        // Reset if there are already two points
        return [newPoint];
      }
    });
  };
  
  

  const toggleDistanceMeasurement = () => {
    setIsDistanceActive(!isDistanceActive);
    setSelectedPoints([]);
    setDistance(null);
  };

  // const toggleFavorite = (pinId) => {
  //     setFavorites(prevFavorites => {
  //         if (prevFavorites.includes(pinId)) {
  //             return prevFavorites.filter(id => id !== pinId);
  //         } else {
  //             return [...prevFavorites, pinId];
  //         }
  //     });
  // };

  // Filter pins based on search term
  const filteredPins = pins.filter((pin) =>
    pin.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Ready to render Polyline:", selectedPoints.length === 2, "Distance:", distance);
  console.log("Initial State - Selected Points:", selectedPoints, "Is Distance Active:", isDistanceActive);

  return (
    <div className="map-interface">
      <div className="map-container">
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by Building Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={toggleDistanceMeasurement}>
          {isDistanceActive ? "Disable Distance Measurement" : "Enable Distance Measurement"}
        </button>
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
          {filteredPins.map((pin) => (
            <Marker key={pin.id} position={pin.coordinates}>
              <Popup>
                <div className="popup-content">
                  <b>{pin.title}</b><br />
                  {pin.description}<br /><br />
                  <button onClick={() => handleMoreDetails(pin)}>More Details</button>
                </div>
              </Popup>
            </Marker>
          ))}
          {selectedPoints.map((point, idx) => (
            <Marker key={idx} position={[point[0], point[1]]}>
              <Popup>{`Selected point ${idx + 1}`}</Popup>
            </Marker>
          ))}
          {selectedPoints.length === 2 && (
            <Polyline positions={selectedPoints} color="blue">
              <Tooltip permanent direction="center">
                {`${distance.toFixed(2)} km`}
              </Tooltip>
            </Polyline>
          )}
        </MapContainer>
      </div>
      {distance !== null && (
        <div className="distance-display">
          Distance between points: {distance.toFixed(2)} km
        </div>
      )}
      {detailsVisible && selectedPin && (
        <div className="overlay" onClick={handleCloseDetails}>
          <div className="details-panel" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPin.title}</h2>
            <p>{selectedPin.description}</p>
            {selectedPin.imageUrl && (
              <img
                src={selectedPin.imageUrl}
                alt={selectedPin.title}
                onError={() => (this.onerror = null, this.src = '../assets/ubc_logo.jpg')}
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <br />
            <label>
              <strong>Capacity:</strong> {selectedPin.capacity}
            </label>
            <br />
            <a className="details-link" href={selectedPin.link}>
              Click for more info!
            </a>
            <div className="details-panel-container">
              <h3>Join the chat and make new friends!</h3>
              <DetailsPanel pin={selectedPin} onClose={handleCloseDetails} />
            </div>
            <button className="close-button" onClick={handleCloseDetails}>
              Close
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapInterface;

function haversineDistance(coords1, coords2, isMiles = false) {
  function toRad(x) {
    return (x * Math.PI) / 180;
  }

  var lon1 = coords1.lon;
  var lat1 = coords1.lat;
  var lon2 = coords2.lon;
  var lat2 = coords2.lat;

  var R = 6371; // Radius of the Earth in km
  if (isMiles) R = 3959; // Radius of the Earth in miles

  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km (or miles)
}
