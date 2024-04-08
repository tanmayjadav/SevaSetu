import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foundation: {}
};

export const foundationSlice = createSlice({
    name: 'foundation',
    initialState,
    reducers: {
        addFoundation: (state, action) => {
            state.foundation = action.payload;
            // Save foundation data to local storage
            localStorage.setItem("foundation", JSON.stringify(action.payload));
        },
        removeFoundation: (state, action) => {
            state.foundation = {};
            // Clear foundation data from local storage
            localStorage.removeItem("foundation");
        }, 
    }
});

export const { addFoundation, removeFoundation } = foundationSlice.actions;
export default foundationSlice.reducer;
