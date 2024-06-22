import { actionTypes } from './actions';
import {createSlice} from "@reduxjs/toolkit";
import {combineReducers} from "redux";

const initialState = {
    title: ''
}

const titleReducer = (state = initialState, action) => {
    return { ...state, title: action.payload };
};

export {
    titleReducer
}