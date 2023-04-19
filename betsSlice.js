import { createSlice } from "@reduxjs/toolkit";

export const betsSlice = createSlice({
  name: "bets",
  initialState: {
    bets: [],
    sortedBets: []
  },
  reducers: {
    logIn: (state, action) => {
      state.bets = action.payload;
    },
    logOut: (state) => {
      state.bets = [];
    },
  },
});

export const { logIn, logOut } = betsSlice.actions;
export const selectBets = (state) => state.bets.bets;
export default betsSlice.reducer;
