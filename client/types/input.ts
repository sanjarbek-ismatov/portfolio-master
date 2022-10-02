export type inputType = {
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  clear: () => void;
} & React.HTMLAttributes<HTMLInputElement>;
