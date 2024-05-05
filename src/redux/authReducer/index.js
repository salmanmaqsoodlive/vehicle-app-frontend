import { createSlice } from "@reduxjs/toolkit";

const persistedUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const persistedAccessToken =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
export const authUser = createSlice({
  name: "authUser",
  initialState: {
    value: {
      user: persistedUser
        ? JSON.parse(persistedUser)
        : {
            name: "",
            email: "",
          },
      token: persistedAccessToken ? JSON.parse(persistedAccessToken) : "",
    },
  },

  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", JSON.stringify(action.payload.token));
      state.value = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      state.user = {};
    },
  },
});

export const { setUser, logout } = authUser.actions;

export default authUser.reducer;
