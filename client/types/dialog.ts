export type dialogButtonType = {
  ok?: (body?: {}) => void;
  cancel?: () => void;
  message: string;
  isPending?: boolean;
};
