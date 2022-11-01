import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    signIn: (state) => {
      state.isSignedIn = true;
    },
    signOut: (state) => {
      state.isSignedIn = false;
    },
  },
});

export const { incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
