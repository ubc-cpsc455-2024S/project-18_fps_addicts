import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sessionLoaded } from './sessionSlice'; // Adjust the import path as needed
import { loginSuccess, loginFailure } from './authSlice'; // Adjust the import path as needed

export const useAuthPersistence = () => {
    const dispatch = useDispatch();
    const session = useSelector((state) => state.session.sessionID);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const storedSessionId = localStorage.getItem('sessionID');
        if (storedSessionId && !session) {
            dispatch(sessionLoaded(storedSessionId));
        }
    }, [dispatch, session]);

    useEffect(() => {
        const checkAuthStatus = async (sessionId) => {
            try {
                const response = await fetch(`https://study-spotter-google-auth.onrender.com/api/user/${sessionId}`, {
                    credentials: 'include'
                });
                if (response.ok) {
                    const userData = await response.json();
                    dispatch(loginSuccess(userData));
                } else {
                    dispatch(loginFailure());
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                dispatch(loginFailure());
            }
        };

        if (session && !user) {
            checkAuthStatus(session);
        }
    }, [dispatch, session, user]);
};