import { actionTypes } from './actions';
import {createSlice} from "@reduxjs/toolkit";
import {combineReducers} from "redux";

const initialState = {
    title: ''
}

const homeReducer = (state = initialState, action) => {
    return { ...state, title: action.payload };
};

const loginReducer = (state = initialState, action) => {
    return { ...state, title: action.payload };
};

const aboutReducer = (state = initialState, action) => {
    return { ...state, title: action.payload };
};

const roomBookingReducer = (state = initialState, action) => {
    return { ...state, title: action.payload };
};

export {
    homeReducer,
    loginReducer,
    aboutReducer,
    roomBookingReducer
}