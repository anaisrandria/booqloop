export type AddBookFormData = {
  title: string;
  author: string;
  description: string;
  published_year?: number;
  image_url: string;
  category_id: number;
  availability_status_id: number;
};
