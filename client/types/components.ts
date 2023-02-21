import { ReactNode } from "react";

export type SearchInput = {
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  clear: () => void;
} & React.HTMLAttributes<HTMLInputElement>;
export type DialogProps = {
  ok?: (body?: {}) => void;
  cancel?: () => void;
  cancelText?: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  okText?: string;

  children: ReactNode;
};
export type DialogStatus = {
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
