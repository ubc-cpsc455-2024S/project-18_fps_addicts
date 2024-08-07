import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Tooltip,
} from "react-leaflet";
import pins from "../assets/updated-waypoints.json";
import DetailsPanel from "./DetailsPanel.jsx";
import DistanceDisplay from "./DistanceDisplay.jsx";
import { styles } from './DistanceDisplay';


const MapInterface = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [mapCenter] = useState([49.2606, -123.246]);
  const [mapZoom] = useState(14);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [distance, setDistance] = useState(null);
  const [isDistanceActive, setIsDistanceActive] = useState(false);
  const [walkingTime, setWalkingTime] = useState(null);

  
  const handleMoreDetails = (pin, point) => {
    setSelectedPin(pin);
    setDetailsVisible(true);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(false);
    setSelectedPin(null);
  };

  useEffect(() => {
    if (selectedPoints.length === 2) {
      const dist = haversineDistance(selectedPoints[0], selectedPoints[1]);
      const time = calculateWalkingTime(dist);
      setDistance(dist);
      setWalkingTime(time);
    }
  }, [selectedPoints]);

  const handleMapClick = (event) => {
    if (!isDistanceActive) return;

    const newPoint = event.latlng ? [event.latlng.lat, event.latlng.lng] : null;

    if (!newPoint) return;

    setSelectedPoints((prevPoints) => {
      if (prevPoints.length < 1) {
        return [newPoint];
      } else if (prevPoints.length === 1) {
        const newPoints = [...prevPoints, newPoint];
        const dist = haversineDistance(prevPoints[0], newPoint);
        setDistance(dist);
        return newPoints;
      } else {
        return [newPoint];
      }
    });
  };

  const toggleDistanceMeasurement = () => {
    setIsDistanceActive(!isDistanceActive);
    setSelectedPoints([]);
    setDistance(null);
    setWalkingTime(null);
  };

  // Filter pins based on search term
  const filteredPins = pins.filter((pin) =>
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button style={styles.button}
          onClick={toggleDistanceMeasurement}
        >
          {isDistanceActive
            ? "Disable Distance Measurement"
            : "Enable Distance Measurement"}
        </button>
         {distance && walkingTime && (
        <DistanceDisplay distance={distance} walkingTime={walkingTime} />
      )}
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: "700px", width: "100%" }}
          onClick={handleMapClick}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
          {filteredPins.map((pin) => (
            <Marker
              key={pin.id}
              position={pin.coordinates}
              eventHandlers={{ click: handleMapClick }}
            >
              <Popup>
                <div className="popup-content">
                  <b>{pin.title}</b>
                  <br />
                  {pin.description}
                  <br />
                  <br />
                  <button className= "moreDetailsButton" onClick={() => handleMoreDetails(pin)}>
                    More Details
                  </button>
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
            <Polyline
              positions={selectedPoints}
              color="#0F52BA"
              weight={5}
              opacity={0.8}
              dashArray="10, 20"
            >
              <Tooltip permanent direction="center">
                {`${distance.toFixed(2)} m`}
              </Tooltip>
            </Polyline>
          )}
        </MapContainer>
      </div>
      {detailsVisible && selectedPin && (
        <div className="overlay" onClick={handleCloseDetails}>
          <div className="details-panel" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPin.title}</h2>
            <p>{selectedPin.description}</p>
            {selectedPin.imageUrl && (
              <img
                src={selectedPin.imageUrl}
                alt={selectedPin.title}
                onError={() => (
                  (this.onerror = null), (this.src = "../assets/ubc_logo.jpg")
                )}
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

  var lat1 = coords1[0];
  var lon1 = coords1[1];
  var lat2 = coords2[0];
  var lon2 = coords2[1];

  var R = 6371000; // Radius of the Earth in meters
  if (isMiles) R = 3959 * 1609.34; // Radius of the Earth in meters (when miles are needed)

  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

function calculateWalkingTime(distance) {
  const secondsPer100Meters = 71.4;
  return (distance / 100) * secondsPer100Meters; // seconds
}