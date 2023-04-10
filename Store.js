import { configureStore } from "@reduxjs/toolkit";
import betsReducer from "./slices/betSlice";

export default configureStore({
  reducer: {
    bets: betsReducer,
  },
});
