import React, { useState } from 'react';
import '../App.css';
import GoogleAuth from "../components/GoogleAuth.jsx";
import ProfileComponent from "../components/ProfileComponent.jsx";

const Profile = () => {

  return (
    <>
    <h1>Welcome to UBC StudySpotter!</h1>
    <div className="profile-container">
      <h3 className="profile-header">Login with your Google Account to get started!</h3>
      <br></br>
      <ProfileComponent />
      <GoogleAuth />
    </div>
    </>

  );
};

export default Profile;