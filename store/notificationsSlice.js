import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    setNotifications: (state, action) => {
      return action.payload;
    },
    clearNotifications: (state) => {
      return [];
    },
  },
});

export const { setNotifications, clearNotifications } = notificationsSlice.actions;

export const selectNotifications = (state) => state.notifications;

export default notificationsSlice.reducer;