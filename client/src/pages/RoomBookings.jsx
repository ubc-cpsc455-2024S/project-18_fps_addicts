import React, { useEffect } from 'react';
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
    },
    {
        name: "UBC ICICS Room Bookings",
        url: "https://my.cs.ubc.ca/docs/reserving-room",
        img: "https://pbs.twimg.com/media/GIfV7jaWsAAazgr?format=jpg&name=4096x4096"
    }
];

const BookingLinks = () => {
    useEffect(() => {
        const handleScroll = () => {
            const cards = document.querySelectorAll('.booking-card');
            const triggerBottom = window.innerHeight / 5 * 4;

            cards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;

                if (cardTop < triggerBottom) {
                    card.classList.add('visible');
                } else {
                    card.classList.remove('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
        <h1>Book a Study Room</h1>
        <div className="bookings-desc">
            <p>
                Need to book a room? no problem! Visit one of these room booking sites and 
                reserve your spot now!
            </p>
        </div>
        <div className="booking-links-container">
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
        <Footer />
        </>
    );
};

export default BookingLinks;

