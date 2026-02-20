"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { BookDetailProps } from "./BookDetail.types";
import { theme } from "@/app/theme";

interface ContactButtonsProps {
  isMobile: boolean;
}

const ContactButtons = ({ isMobile }: ContactButtonsProps) => {
  return (
    <Stack
      direction={isMobile ? "row" : "column"}
      gap={2}
      paddingX={isMobile ? 3 : 0}
      sx={{
        position: isMobile ? "fixed" : "relative",
        bottom: isMobile ? 0 : "auto",
        left: isMobile ? 0 : "auto",
        height: isMobile ? "8vh" : "auto",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
          width: "100%",
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
          width: "100%",
          flex: 1,
        }}
      >
        Réserver
      </Button>
    </Stack>
  );
};

const BookDetail = ({ book }: BookDetailProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });

  return (
    book && (
      <Container
        maxWidth="md"
        disableGutters
        sx={{ paddingX: { xs: 0, md: 5 } }}
      >
        <Stack
          gap={3}
          flexDirection={{ xs: "column", sm: "row" }}
          flex="1 1"
          height="75vh"
        >
          <Stack
            sx={{
              flex: { sm: 1 },
              border: "1px solid black",
              borderRadius: "10px",
              minHeight: "420px",
              backgroundImage: `url(${book.image_url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center top",
              overflow: "hidden",
            }}
          />
          <Stack
            paddingX={{ xs: 2, sm: 0, md: 5 }}
            gap={3}
            sx={{ flex: { sm: 1 } }}
          >
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
            <Stack gap={1} overflow="auto">
              <Typography fontSize={18}>
                <span style={{ fontWeight: "bold" }}>{book.title}</span>,{" "}
                {book.author}
              </Typography>
              <Typography align="justify">{book.description}</Typography>
            </Stack>
            {!isMobile && <ContactButtons isMobile={isMobile} />}
          </Stack>
        </Stack>
        {isMobile && <ContactButtons isMobile={isMobile} />}
      </Container>
    )
  );
};

export default BookDetail;
