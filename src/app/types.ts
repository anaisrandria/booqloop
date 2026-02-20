export type Category = {
  id: number;
  name: string;
};

export type BookUser = {
  id: number;
  postal_code: number;
  country: string;
}

export type Book = {
  id: number;
  title: string;
  author: string;
  description?: string;
  published_year: number;
  image_url: string;
  category_id: number;
  availability_status_id: number;
  user: BookUser;
};
