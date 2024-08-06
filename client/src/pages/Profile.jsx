import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import GoogleAuth from "../components/GoogleAuth.jsx";
import ProfileComponent from "../components/ProfileComponent.jsx";
import Footer from '../components/Footer';

const Profile = () => {
  const session = useSelector((state) => state.session.sessionID);
  const profileContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    if (profileContainerRef.current) {
      observer.observe(profileContainerRef.current);
    }

    return () => {
      if (profileContainerRef.current) {
        observer.unobserve(profileContainerRef.current);
      }
    };
  }, []);

  return (
    <>
      <h1>Welcome to UBC StudySpotter!</h1>
      <div className="profile-container fade-in" ref={profileContainerRef}>
        {!session && <h3 className="profile-header">Login with your Google Account to get started!</h3>}
        <br />
        <br />
        <ProfileComponent />
        <GoogleAuth />
      </div>
      <Footer />
    </>
  );
};

export default Profile;

