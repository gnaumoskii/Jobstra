import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthorized: boolean;
    username?: string;
}

const initialState: AuthState = {
    isAuthorized: false,
    username: "",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authorize: (state, action) => {
            state.isAuthorized = true;
            state.username = action.payload;
        },
        disauthorize: (state) => {
            state.isAuthorized = false;
            state.username = "";
        }
    }
});

export const {authorize, disauthorize} = authSlice.actions;
export default authSlice.reducer;