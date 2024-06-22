import { actionTypes } from './actions';

export const setHomeState = (state) => ({
    type: actionTypes.SET_HOME_STATE,
    payload: state,
});

export const setLoginState = (state) => ({
    type: actionTypes.SET_LOGIN_STATE,
    payload: state,
});

export const setAboutState = (state) => ({
    type: actionTypes.SET_ABOUT_STATE,
    payload: state,
});

export const setRoomBookingsState = (state) => ({
    type: actionTypes.SET_ROOM_BOOKINGS_STATE,
    payload: state,
});