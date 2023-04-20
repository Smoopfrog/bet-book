import { createSlice } from "@reduxjs/toolkit";

export const betsSlice = createSlice({
  name: "bets",
  initialState: {
    bets: [],
    sortedBets: []
  },
  reducers: {
    getBets: (state, action) => {
      state.bets = action.payload;
    },
    logOut: (state) => {
      state.bets = [];
    },
    updateBetResult: (state, action) => {
      state.bets = state.bets.map((bet) => {
        if (bet.id === action.payload.id) {
          return {
            ...bet,
           result: action.payload.value,
          };
        }
        return bet;
      });
    },
  },
});

export const { getBets, logOut, updateBetResult } = betsSlice.actions;
export const selectBets = (state) => state.bets.bets;
export default betsSlice.reducer;
