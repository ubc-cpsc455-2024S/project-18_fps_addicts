import { configureStore } from '@reduxjs/toolkit';
import authReducer from './users/authSlice';
import profileReducer from './users/profileSlice';
import sessionReducer from './users/sessionSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        session: sessionReducer
    }
});

export default store;