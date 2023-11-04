import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
  },
});
