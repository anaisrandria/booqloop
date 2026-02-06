import { getBook } from "@/lib/services/books/getBook";
import BookDetail from "./BookDetail";
import { BookPageProps } from "./BookDetail.types";

const BookPage = async ({ params }: BookPageProps) => {
  const bookId = Number(params.id);
  const book = await getBook(bookId);

  return <BookDetail book={book} />;
};

export default BookPage;
