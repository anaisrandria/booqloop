import { Button, Stack, Typography } from "@mui/material";
import { BookDetailProps } from "./BookDetail.types";

const BookDetail = ({ book }: BookDetailProps) => {
  return (
    book && (
      <Stack gap={3}>
        <Stack
          sx={{
            border: "1px solid black",
            borderRadius: "10px",
            height: "420px",
            backgroundImage: `url(${book.image_url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
        />
        <Stack paddingX={2} gap={3}>
          <Stack direction="row" gap={2}>
            <Stack
              sx={{
                border: "1px solid black",
                borderRadius: "50px",
                height: "50px",
                width: "50px",
                opacity: 0.5,
                backgroundImage:
                  "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPHHLCPnASW-uMU5Iun97gCckqqlm6DAh5-Q&s)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                overflow: "hidden",
              }}
            />
            <Stack sx={{ justifyContent: "center" }}>
              <Typography fontWeight={"bold"}>Agathe</Typography>
              <Typography>2 prêts, 3 emprunts</Typography>
            </Stack>
          </Stack>
          <Stack gap={1}>
            <Typography fontSize={18}>
              <span style={{ fontWeight: "bold" }}>{book.title}</span>,{" "}
              {book.author}
            </Typography>
            <Typography align="justify">{book.description}</Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          gap={2}
          paddingX={3}
          sx={{
            position: "fixed",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            height: "8vh",
            width: "100vw",
            bottom: -1,
            left: 0,
            backgroundColor: "#f7f2ec",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "black",
              textTransform: "none",
              borderRadius: "10px",
              flex: 1,
            }}
          >
            Message
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "black",
              textTransform: "none",
              borderRadius: "10px",
              flex: 1,
            }}
          >
            Réserver
          </Button>
        </Stack>
      </Stack>
    )
  );
};

export default BookDetail;
