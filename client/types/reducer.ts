import { store } from "state/store";

export type registerSliceInitialStateType = {
  status: string | boolean | undefined;
  error: string;
};
export type loginInitialStateType = {
  status: boolean;
  error: string;
  token: string;
};
export type form = FormData | { email: string; isDirect: boolean };
export type portfolioSliceInitialStateType = {
  status: boolean | string;
  error: string;
};
export type errorType = { response: { data: string } };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
