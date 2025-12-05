import {
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";
import { Book, Category } from "../../types";
import { logger } from "../../../lib/logger";

const Home = async () => {
  const baseUrl = "http://127.0.0.1:8000";

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${baseUrl}/books/get-books`);
      if (!response.ok) {
        throw new Error("Failed to fetch books data");
      }
      const books = await response.json();
      return books;
    } catch (error) {
      console.error("Error fetching all books:", error);
      return null;
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseUrl}/books/get-categories`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories data");
      }
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error("Error fetching all categories:", error);
      return null;
    }
  };

  const books = await fetchBooks();
  const categories = await fetchCategories();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          width: "100%",
          height: "2em",
          marginBottom: "3em",
          justifyContent: "center",
          alignItems: "center",
          overflow: "scroll",
          justifyItems: "center",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {categories &&
            categories.map((category: Category, index: number) => (
              <Button
                key={index}
                size="small"
                variant="outlined"
                sx={{
                  whiteSpace: "nowrap",
                  minWidth: "150px",
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  borderRadius: "10px",
                  flexShrink: 0,
                }}
              >
                {category.name}
              </Button>
            ))}
        </Stack>
      </Box>

      <Typography sx={{ fontWeight: "bold", my: 2 }}>
        Récemment ajoutés
      </Typography>

      <ImageList
        sx={{
          width: "100%",
          height: "100%",
        }}
        cols={6}
        gap={8}
      >
        {books &&
          books.map((book: Book, index: number) => (
            <ImageListItem
              key={index}
              sx={{
                aspectRatio: "4 / 5",
                maxWidth: "185px",
                mx: "auto",
              }}
            >
              <img
                srcSet={book.image_url}
                src={book.image_url}
                alt={book.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid black",
                }}
              />
              <ImageListItemBar
                title={book.title}
                subtitle={book.author}
                position="below"
              />
            </ImageListItem>
          ))}
      </ImageList>
    </Container>
  );
};

export default Home;
