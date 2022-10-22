import { configureStore } from "@reduxjs/toolkit";
import { registerSlice } from "./reducers";
import { createLogger } from "redux-logger";
export const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      createLogger()
    );
  },
});
