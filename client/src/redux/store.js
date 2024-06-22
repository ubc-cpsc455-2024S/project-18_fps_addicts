import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './users/authSlice';
import { homeReducer, aboutReducer, loginReducer, roomBookingReducer } from "./pages/reducer";

const rootReducer = combineReducers({
    home: homeReducer,
    about: aboutReducer,
    login: loginReducer,
    roomBookings: roomBookingReducer,
    auth: authReducer,
    //TODO: add other reducers
});

export const store = configureStore({
    reducer: rootReducer
});

export default store;