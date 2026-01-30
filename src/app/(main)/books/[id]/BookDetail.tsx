import { BookDetailProps } from "./BookDetail.types";

const BookDetail = ({ book }: BookDetailProps) => {
  return book && <h6>{book.title}</h6>;
};

export default BookDetail;
