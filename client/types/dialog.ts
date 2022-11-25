export type dialogButtonType = {
  ok?: (body?: {}) => void;
  cancel?: () => void;
  okText?: string;
  cancelText?: string;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  isPending?: boolean;
};
