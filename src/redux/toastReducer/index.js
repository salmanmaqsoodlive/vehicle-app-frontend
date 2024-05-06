import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  notifications: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast(state, action) {
      state.notifications.push({
        id: uuidv4(), // Generate unique ID
        message: action.payload.message,
        type: action.payload.type,
      });
    },
    removeToast(state, action) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
