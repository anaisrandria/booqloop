import { Book } from "@/app/types";

export type BookGridProps = {
  books: Book[];
  isLoading?: boolean;
  header: string;
  showEditIcons?: boolean;
};
