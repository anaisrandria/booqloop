import { BookCardProps } from "./BookCard.types";

const BookCard = ({ book }: BookCardProps) => {
  return book && <h1>Book: {book.title}</h1>;
};

export default BookCard;
