import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

export const store = configureStore({
  reducer: {
    // toastReducer,
    authReducer,
  },
});
