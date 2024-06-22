import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './users/authSlice';
import { titleReducer } from "./pages/reducer";

const rootReducer = combineReducers({
    pages: titleReducer,
    auth: authReducer,
    //TODO: add other reducers
});

export const store = configureStore({
    reducer: rootReducer
});

export default store;