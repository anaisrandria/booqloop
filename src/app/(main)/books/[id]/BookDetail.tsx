"use client";

import { Container, Stack, Typography, useMediaQuery } from "@mui/material";
import { BookDetailProps } from "./BookDetail.types";
import { theme } from "@/app/theme";
import { ContactButtons } from "@/app/components/ContactButtons";

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
                  borderRadius: "50px",
                  height: "50px",
                  width: "50px",
                  backgroundColor: "lightgray",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {book.user.username && (
                  <Typography fontWeight="semibold" fontSize={20}>
                    {book.user.username[0].toUpperCase()}
                  </Typography>
                )}
              </Stack>
              <Stack sx={{ justifyContent: "center" }}>
                <Typography fontWeight={"bold"}>
                  {book.user.username}
                </Typography>
                <Typography>{`${book.user.address} (${book.user.postal_code})`}</Typography>
              </Stack>
            </Stack>
            <Stack gap={1} overflow="auto">
              <Typography fontSize={18}>
                <span style={{ fontWeight: "bold" }}>{book.title}</span>,{" "}
                {book.author}
              </Typography>
              <Typography align="justify">{book.description}</Typography>
            </Stack>
            {!isMobile && (
              <ContactButtons isMobile={isMobile} bookId={book.id} />
            )}
          </Stack>
        </Stack>
        {isMobile && <ContactButtons isMobile={isMobile} bookId={book.id} />}
      </Container>
    )
  );
};

export default BookDetail;
