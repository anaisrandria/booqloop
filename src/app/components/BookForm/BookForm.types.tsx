export type BookFormProps = {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => Promise<void>;
  submitLabel: string;
  title: string;
};

export type BookFormData = {
  title: string;
  author: string;
  description: string;
  published_year?: number;
  image_url: string;
  category_id: number;
  availability_status_id: number;
};
