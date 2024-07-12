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
            const response = await fetch('http://localhost:3000/api/user', {
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
        window.location.href = 'http://localhost:3000/auth/google';
    };

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/auth/logout', { credentials: 'include' });
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
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    <span>Logout</span>
                </button>
            ) : (
                <button
                    onClick={handleLogin}
                    className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded shadow transition duration-300 ease-in-out"
                >
                    <span>Login with Google</span>
                </button>
            )}
        </div>
    );
};

export default GoogleAuth;