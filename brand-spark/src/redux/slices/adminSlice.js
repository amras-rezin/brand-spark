import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    loggedIn: false,
};

export const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        adminLogin: (state, action) => { 
            state.name = action.payload.name;
            state.loggedIn = action.payload.loggedIn;
        },
        adminLogout: (state) => {
            state.name = "";
            state.loggedIn = false;
            localStorage.removeItem('adminToken');
        }
    }
});

export const { adminLogin, adminLogout } = adminAuthSlice.actions;

export default adminAuthSlice;
