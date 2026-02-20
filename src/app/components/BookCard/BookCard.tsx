import { Stack, Typography } from "@mui/material";
import { BookCardProps } from "./BookCard.types";
import { useRouter } from "next/navigation";

const BookCard = ({ book }: BookCardProps) => {
  const router = useRouter();
  return (
    book && (
      <Stack
        spacing={1}
        sx={{
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8,
          },
        }}
        onClick={() => router.push(`/books/${book.id}`)}
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
              lineHeight: "1.3",
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
              lineHeight: "1.3",
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
