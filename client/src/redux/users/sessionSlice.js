import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        sessionID: null
    },
    reducers: {
        sessionReceived: (state, action) => {
            state.sessionID = action.payload;
        },
        sessionLost: (state) => {
            state.sessionID = null;
        }
    },
});

export const { sessionReceived, sessionLost } = sessionSlice.actions;

export default sessionSlice.reducer;