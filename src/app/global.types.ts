export type Category = {
  id: number;
  name: string;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  published_year: number;
  image_url: string;
  user_id: number;
  category_id: number;
  availability_status_id: number;
};
