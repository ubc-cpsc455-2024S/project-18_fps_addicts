import React from 'react';
import './RoomBookings.css';

const bookingLinks = [
    {
        name: "UBC Engineers Study Rooms",
        url: "https://ubcengineers.ca/study-rooms",
        img: "https://mech2.sites.olt.ubc.ca/files/2017/10/ESC_front.jpg"
    },
    {
        name: "UBC Library Study Spaces",
        url: "https://libcal.library.ubc.ca/spaces",
        img: "https://services.library.ubc.ca/files/2020/03/ikblc-banner-exterior.jpg"
    },
    {
        name: "AUS Room Bookings",
        url: "https://www.ubcaus.ca/room-bookings",
        img: "https://smithandandersen.com/sites/default/files/styles/1280px_wide/public/2022-03/UBC-ArtsStudentCentre_BannerSize-01_2270x1335.jpg?itok=0juz4i8_"
    },
    {
        name: "Sauder School of Business Room Bookings",
        url: "https://booking.sauder.ubc.ca/",
        img: "https://www.sauder.ubc.ca/sites/default/files/dynamic_styles/scale/750/public/2019-05/about-ubc-sauder-hero.png"
    }
];

const BookingLinks = () => {
    return (
        <div className="booking-links-container">
            <h1>Book a Study Room</h1>
            <div className="booking-cards">
                {bookingLinks.map((link, index) => (
                    <div key={index} className="booking-card">
                        <img src={link.img} alt={link.name} className="booking-card-image" />
                        <h2>{link.name}</h2>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            Go to Booking Page
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingLinks;
