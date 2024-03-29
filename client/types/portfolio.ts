export type User = {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  username: string;
  email: string;
  isDirect: boolean;
  portfolios: Portfolio[];
  description: string;
  registeredDate: string;
  telegramProfile: string;
  githubProfile: string;
  skills: string[];
};
export type Comment = {
  commentAuthor: User;
  body: string;
  date: string;
};
export type Portfolio = {
  _id: string;
  images: string[];
  title: string;
  description: string;
  author: User;
  date: string;
  likes: string[];
  linktitle: string;
  used: string[];
  comments: Comment[];
  url: string;
};
export type Like = {
  isLiked: boolean;
  count: number;
};
