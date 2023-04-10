import { configureStore } from "@reduxjs/toolkit";
import betsReducer from "./betsSlice";

export default configureStore({
  reducer: {
    bets: betsReducer,
  },
});
