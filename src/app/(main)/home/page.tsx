import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Book, Category } from "../../types";
import { BookCard } from "@/app/components/BookCard";

const Home = async () => {
  const baseUrl = "http://127.0.0.1:8000";

  const fetchBooks = async (): Promise<Book[] | null> => {
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
    <Container maxWidth="md">
      <Stack spacing={4}>
        <Box
          sx={{
            width: "100%",
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

        <Stack spacing={2}>
          <Typography
            sx={{
              fontsize: "14px",
              fontWeight: "600",
              fontFamily: "Poppins",
            }}
          >
            Récemment ajoutés
          </Typography>
          <Grid
            container
            columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
            rowSpacing={3}
            columnSpacing={2.5}
          >
            {books &&
              books.map((book: Book, index: number) => (
                <Grid key={index} size={1}>
                  <BookCard book={book} />
                </Grid>
              ))}
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
