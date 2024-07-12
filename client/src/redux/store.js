import { configureStore } from '@reduxjs/toolkit';
import authReducer from './users/authSlice';
import profileReducer from './users/profileSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
    }
});

export default store;