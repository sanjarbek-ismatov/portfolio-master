export type inputType = {
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
} & React.HTMLAttributes<HTMLInputElement>;
