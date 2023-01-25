export type user = {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  username: string;
  email: string;
  isDirect: boolean;
  portfolios: string[];
  description: string;
  telegramProfile: string;
  githubProfile: string;
  skills: string[];
};
export type commentType = {
  commentAuthor: user;
  body: string;
  date: string;
};
export type portfolio = {
  _id: string;
  images: string[];
  title: string;
  description: string;
  author: user;
  date: string;
  likes: string[];
  used: string[];
  comments: commentType[];
  url: string;
};
export type likeType = {
  isLiked: boolean;
  count: number;
};
