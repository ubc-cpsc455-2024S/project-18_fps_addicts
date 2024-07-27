import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import GoogleAuth from "../components/GoogleAuth.jsx";
import ProfileComponent from "../components/ProfileComponent.jsx";

const Profile = () => {
  const session = useSelector((state) => state.session.sessionID);

  return (
      <>
        <h1>Welcome to UBC StudySpotter!</h1>
        <div className="profile-container">
          {!session && <h3 className="profile-header">Login with your Google Account to get started!</h3>}
          <br />
          <ProfileComponent />
          <GoogleAuth />
        </div>
      </>
  );
};

export default Profile;
