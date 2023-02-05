export type SearchInput = {
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  clear: () => void;
} & React.HTMLAttributes<HTMLInputElement>;
export type DialogProps = {
  ok?: (body?: {}) => void;
  cancel?: () => void;
  okText?: string;
  cancelText?: string;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  isPending?: boolean;
};
export type HeadProps = {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
};
