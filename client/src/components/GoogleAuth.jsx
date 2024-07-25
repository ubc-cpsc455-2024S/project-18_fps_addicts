import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {loginFailure, loginSuccess, logout} from "../redux/users/authSlice.js";

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        // Check if user is authenticated on component mount
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('https://ubcstudyspotterserver.onrender.com/api/user', {
                credentials: 'include' // Important for including cookies
            });
            if (response.ok) {
                const user = await response.json();
                dispatch(loginSuccess(user));
            } else {
                dispatch(loginFailure());
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            dispatch(loginFailure());
        }
    };

    const handleLogin = () => {
        window.location.href = 'https://ubcstudyspotterserver.onrender.com/auth/google';
    };

    const handleLogout = async () => {
        try {
            await fetch('https://ubcstudyspotterserver.onrender.com/auth/logout', { credentials: 'include' });
            dispatch(logout());
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex justify-center">
            {isAuthenticated ? (
                <button
                    onClick={handleLogout}

                    className="logout-button"

                >
                    <span>Logout</span>
                </button>
            ) : (
                <button
                    onClick={handleLogin}
                    className="google-button"

                >
                    <span>Login with Google</span>
                </button>
            )}
        </div>
    );
};

export default GoogleAuth;