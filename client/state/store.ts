import { configureStore } from "@reduxjs/toolkit";
import { portfolioApi } from "./api/portfolioApi";
export const store = configureStore({
  reducer: {
    [portfolioApi.reducerPath]: portfolioApi.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      portfolioApi.middleware
    );
  },
});
