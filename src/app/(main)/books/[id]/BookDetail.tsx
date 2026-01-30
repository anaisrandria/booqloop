import { Stack } from "@mui/material";
import { BookDetailProps } from "./BookDetail.types";

const BookDetail = ({ book }: BookDetailProps) => {
  return book && <Stack sx={{ flexGrow: 1 }}></Stack>;
};

export default BookDetail;
