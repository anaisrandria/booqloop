import { Book } from "@/app/types";

export type BookDetailProps = {
  book: Book | null;
};

export type BookPageProps = {
  params: {
    id: string;
  };
};
