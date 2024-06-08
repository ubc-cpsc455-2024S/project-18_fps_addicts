import React, { useState } from 'react';
import ExternalLink from '../components/ExternalLink';
import './RoomBookings.css';

const RoomBookings = () => {
  const [date, setDate] = useState(''); // State for the date
  const [fromTime, setFromTime] = useState(''); // State for the start time
  const [toTime, setToTime] = useState(''); // State for the end time

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleFromTimeChange = (event) => {
    setFromTime(event.target.value);
  };

  const handleToTimeChange = (event) => {
    setToTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission functionality for later
  };

  return (
    <div>
      <h1>Room Bookings</h1>
      <div className="room-bookings-container">
      <form onSubmit={handleSubmit} className="booking-form">
        <label htmlFor="date">Date:</label>
        <input 
          type="date" 
          id="date" 
          name="date" 
          value={date} 
          onChange={handleDateChange} 
        />
        <label htmlFor="fromTime">From:</label>
        <input 
          type="time" 
          id="fromTime" 
          name="fromTime" 
          value={fromTime} 
          onChange={handleFromTimeChange} 
        />
        <label htmlFor="toTime">To:</label>
        <input 
          type="time" 
          id="toTime" 
          name="toTime" 
          value={toTime} 
          onChange={handleToTimeChange} 
        />
        <button type="submit">Check Availability</button>
      </form>
      <div className="results-container">
        <h2>Available Rooms</h2>
        <table className="results-table">
          <thead>
            <tr>
              <th>Room</th>
              <th>Building</th>
              <th>Booking Link</th>
            </tr>
          </thead>
          <tbody>
            {/* Add functionality to dynamically generate rows later */}
            <tr>
              <td>Room 101</td>
              <td>IKB</td>
              <td><ExternalLink url="https://libcal.library.ubc.ca/r/search/ikbstudy">Book Now</ExternalLink></td>
            </tr>
            <tr>
              <td>Room 202</td>
              <td>EUS</td>
              <td><ExternalLink url="https://ubcengineers.ca/study-rooms">Book Now</ExternalLink></td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default RoomBookings;