import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils';

const initialState = {
    access_token: null,
}

const slice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state:any, action:any) => {
            state.access_token = action.payload.access_token;
        },
    }
});

export const { reducer: authReducer, actions: authActions } = slice;