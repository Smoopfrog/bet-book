import { createSlice } from "@reduxjs/toolkit";

export const betsSlice = createSlice({
  name: "bets",
  initialState: {
    bets: null,
  },
  reducers: {
    logIn: (state, action) => {
      state.bets = action.payload;
    },
    logOut: (state) => {
      state.bets = null;
    },
  },
});

export const { logIn, logOut } = betsSlice.actions;
export const selectUser = (state) => state.bets.bets;
export default betsSlice.reducer;
