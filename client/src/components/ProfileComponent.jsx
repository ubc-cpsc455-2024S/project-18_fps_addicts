import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/users/profileSlice.js';
import axios from 'axios';
import { Navigate } from "react-router-dom";

const ProfileComponent = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`https://ubcstudyspotterserver.onrender.com/users/${user._id}`, { name, email });
            dispatch(setUser(response.data));
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(`Failed to update profile: ${error.response?.data?.error || error.message}`);
        }
    };

    if (!user) {
        return <div />;
    }

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <div>
                <img src={user.picture} alt="Profile" />
                <input
                    className="profile-input"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    className="profile-input"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <button className="update-button" onClick={handleUpdate}>Update Profile</button>

            </div>
        </div>
    );
};

export default ProfileComponent;