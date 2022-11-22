import { configureStore } from "@reduxjs/toolkit";
import { loginSlice, portfolioSlice, registerSlice } from "./reducers";
import { createLogger } from "redux-logger";
export const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    login: loginSlice.reducer,
    portfolio: portfolioSlice.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      createLogger()
    );
  },
});
