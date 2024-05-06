import { createSlice } from "@reduxjs/toolkit";

export const category = createSlice({
  name: "category",
  initialState: {
    value: {
      categories: [],
    },
  },

  reducers: {
    setCategories: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCategories, logout } = category.actions;

export default category.reducer;
