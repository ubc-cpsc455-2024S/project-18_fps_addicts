import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const validateAndSetSession = createAsyncThunk(
    'session/validateAndSet',
    async (_, { dispatch }) => {
        const storedSessionId = localStorage.getItem('sessionID');
        if (!storedSessionId) {
            throw new Error('No stored session');
        }

        const response = await fetch(`https://study-spotter-google-auth.onrender.com/api/user/${storedSessionId}`, {
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Invalid session');
        }

        const user = await response.json();
        sessionStorage.setItem('sessionID', storedSessionId);
        return { sessionID: storedSessionId, user };
    }
);

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        sessionID: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    },
    reducers: {
        sessionReceived: (state, action) => {
            state.sessionID = action.payload;
            localStorage.setItem('sessionID', action.payload);
        },
        sessionCleared: (state) => {
            state.sessionID = null;
            state.stats = 'idle';
            localStorage.removeItem('sessionID');
            sessionStorage.removeItem('sessionID');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(validateAndSetSession.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(validateAndSetSession.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sessionID = action.payload.sessionID;
            })
            .addCase(validateAndSetSession.rejected, (state) => {
                state.status = 'failed';
                state.sessionID = null;
            });
    },
});

export const { sessionReceived, sessionCleared } = sessionSlice.actions;

export default sessionSlice.reducer;