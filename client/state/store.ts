import { configureStore } from "@reduxjs/toolkit";
import { loginSlice, portfolioSlice, registerSlice } from "./reducers";
import { createLogger } from "redux-logger";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "types/reducer";
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
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
