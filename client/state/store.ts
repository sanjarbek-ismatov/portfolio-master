import { bindActionCreators, configureStore } from "@reduxjs/toolkit";
import {
  likeSlice,
  loginSlice,
  portfolioSlice,
  registerSlice,
} from "./reducers";
import { createLogger } from "redux-logger";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "types/reducer";
import { loginThunk, portfolioThunk, registerThunk, likeThunk } from "./thunks";
import { portfolioApi } from "./api/portfolioApi";
export const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    login: loginSlice.reducer,
    portfolio: portfolioSlice.reducer,
    like: likeSlice.reducer,
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
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch<AppDispatch>;
export const {
  loginThunk: login,
  registerThunk: register,
  portfolioThunk: portfolio,
  likeThunk: like,
} = bindActionCreators(
  { loginThunk, registerThunk, portfolioThunk, likeThunk },
  store.dispatch
);
