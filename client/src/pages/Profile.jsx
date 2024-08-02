import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import GoogleAuth from "../components/GoogleAuth.jsx";
import ProfileComponent from "../components/ProfileComponent.jsx";
import ubc from '../assets/ubc-official-logo.png';

const Profile = () => {
  const session = useSelector((state) => state.session.sessionID);

  return (
      <>
        <h1>Welcome to UBC StudySpotter!</h1>
        <div className="profile-container">
          {!session && <h3 className="profile-header">Login with your Google Account to get started!</h3>}
          <img className="ubc" src={ubc} alt="ubc" style={{ width: 'auto', height: '200px' }} />
          <br />
          <br />
          <ProfileComponent />
          <GoogleAuth />
        </div>
      </>
  );
};

export default Profile;
