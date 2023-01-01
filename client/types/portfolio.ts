export type portfolio = {
  _id: string;
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
export type likeType = {
  isLiked: boolean;
  count: number;
};
