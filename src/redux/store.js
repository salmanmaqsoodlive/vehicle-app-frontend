import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";

export const store = configureStore({
  reducer: {
    authReducer,
    categoryReducer,
  },
});
