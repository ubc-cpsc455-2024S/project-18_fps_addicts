import React, { useState } from 'react';
import '../App.css';
import GoogleAuth from "../components/GoogleAuth.jsx";
import ProfileComponent from "../components/ProfileComponent.jsx";

const Profile = () => {

  return (
    <div className="profile-container">
      <ProfileComponent />
      <GoogleAuth />
    </div>
  );
};

export default Profile;