export type UserSession = {
  expires: string;
  user: {
    email: string;
    image: string;
    name: string;
  };
};
