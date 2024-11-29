import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: null,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices(state, action) {
      state.services = action.payload;
    },
  },
});

export const { setServices } = servicesSlice.actions;
export const getServices = (state) => state.services.services;

export default servicesSlice.reducer;
