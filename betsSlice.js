import { createSlice } from "@reduxjs/toolkit";

export const betsSlice = createSlice({
  name: "bets",
  initialState: {
    bets: [],
    sortedBets: [],
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
    addBet: (state, action) => {
      console.log("state", state.bets);
      console.log("action", action.payload);

      state.bets = [...state.bets, action.payload];
    },
  },
});

export const { getBets, logOut, updateBetResult, addBet } = betsSlice.actions;
export const selectBets = (state) => state.bets.bets;
export default betsSlice.reducer;
