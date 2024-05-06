import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import toastReducer from "./toastReducer";

export const store = configureStore({
  reducer: {
    authReducer,
    categoryReducer,
    toastReducer,
  },
});
