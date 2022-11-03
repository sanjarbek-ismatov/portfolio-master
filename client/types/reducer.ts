export type registerSliceInitialStateType = {
  status: string | boolean | undefined;
  error: string;
};
export type loginInitialStateType = {
  status: boolean;
  error: string;
  token: string;
};
export type form = FormData | { email: string };
