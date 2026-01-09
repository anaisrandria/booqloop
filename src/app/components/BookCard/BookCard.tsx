import { Stack, Typography } from "@mui/material";
import { BookCardProps } from "./BookCard.types";

const BookCard = ({ book }: BookCardProps) => {
  return (
    book && (
      <Stack
        spacing={1}
        sx={{
          maxWidth: "150px",
        }}
      >
        <Stack
          sx={{
            border: "1px solid black",
            borderRadius: "10px",
            height: "200px",
            backgroundImage: `url(${book.image_url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
        />
        <Stack>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontsize: "10px",
              fontWeight: "600",
              fontFamily: "Poppins",
            }}
          >
            {book.title}
          </Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontsize: "10px",
              fontFamily: "Poppins",
            }}
          >
            {book.author}
          </Typography>
        </Stack>
      </Stack>
    )
  );
};

export default BookCard;
