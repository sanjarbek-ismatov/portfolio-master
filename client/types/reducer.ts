import { store } from "state/store";
export type RegisterSliceInitialStateType = {
  status: string | boolean | undefined;
  error: string;
};
export type LoginInitialStateType = {
  status: boolean;
  error: string;
  token: string;
};
export type Form = FormData | { email: string; isDirect: boolean };
export type PortfolioSliceInitialStateType = {
  status: boolean | string;
  error: string;
};
export type Error = { response: { data: string } };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
