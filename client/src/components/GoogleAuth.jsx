import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginSuccess, logout } from "../redux/users/authSlice.js";
import { sessionLost, sessionReceived } from "../redux/users/sessionSlice.js";
import { Link } from 'react-router-dom';


const GoogleAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const session = useSelector((state) => state.session.sessionID);

    useEffect(() => {
        // Handle session ID from URL on component mount
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('sessionId');
        if (sessionId) {
            dispatch(sessionReceived(sessionId));
            localStorage.setItem('sessionID', sessionId);
            window.history.replaceState({}, document.title, window.location.pathname); // Clean the URL
        }
    }, [dispatch]);

    useEffect(() => {
        if (session) {
            checkAuthStatus(session);
        }
    }, [session]);

    const checkAuthStatus = async (sessionId) => {
        try {
            const response = await fetch(`https://study-spotter-google-auth.onrender.com/api/user/${sessionId}`, {
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
        window.location.href = 'https://study-spotter-google-auth.onrender.com/auth/google';
    };

    const handleLogout = async () => {
        try {
            await fetch(`https://study-spotter-google-auth.onrender.com/auth/logout/${session}`, { credentials: 'include' });
            dispatch(logout());
            dispatch(sessionLost());
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex justify-center">
            {isAuthenticated ? (
                <>
                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        <span>Logout</span>
                    </button>
                    <Link to="/" className="back-to-map-button">
                        <button className="back-to-map-button">
                            <span>Back to Map</span>
                        </button>
                    </Link>
                </>

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