import { configureStore } from "@reduxjs/toolkit";
import { loginSlice, registerSlice } from "./reducers";
import { createLogger } from "redux-logger";
export const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    login: loginSlice.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      createLogger()
    );
  },
});
