import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    info:null,      
}

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    configLocation(state, action) {
      state.info=action.payload;
    },
    clearLocation(state, action) {
      state.info=null;
    },
  },
})

export const { configLocation,clearLocation} = locationSlice.actions;
export const getLocation = state => state.location.info;

export default locationSlice.reducer
