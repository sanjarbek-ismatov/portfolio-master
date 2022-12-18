export type portfolio = {
  images: string[];
  title: string;
  description: string;
  author: string;
  date: string;
  likes: string[];
  comments: {
    commentAuthor: string;
    body: string;
    date: string;
  };
  url: string;
};
export type like = {
  isLiked: boolean;
  count: number;
};
