import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { portfolioApi } from "./api/portfolioApi";
export const store = configureStore({
  reducer: {
    [portfolioApi.reducerPath]: portfolioApi.reducer,
  },

  middleware(getDefaultMiddleware) {
    if (process.env.NODE_ENV === "development") {
      return getDefaultMiddleware({ serializableCheck: false }).concat(
        createLogger(),
        portfolioApi.middleware
      );
    } else {
      return getDefaultMiddleware({ serializableCheck: false }).concat(
        portfolioApi.middleware
      );
    }
  },
});
