"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Book, Category } from "../../types";
import { BookCard } from "@/app/components/BookCard";
import { getCategories } from "@/lib/services/books/getCategories";
import { useEffect, useState } from "react";
import { getBooks } from "@/lib/services/books/getBooks";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { PostalCodePopover } from "@/app/components/PostalCodePopover";
import { useSearch } from "@/hooks/useSearch";

const Home = () => {
  const { searchQuery } = useSearch();
  const [categories, setCategories] = useState<Category[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [postalCode, setPostalCode] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postalCodes = [1, 10001, 75001, 75002, 75003, 75004, 75005];

  const filteredBooks = books?.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  useEffect(() => {
    const loadCategoryData = async () => {
      const categoryData = await getCategories();
      setCategories(categoryData);
    };
    loadCategoryData();
  }, []);

  useEffect(() => {
    const loadBookData = async () => {
      setIsLoading(true);
      const filters: Record<string, number> = {};
      if (selectedCategory !== null) filters.categoryId = selectedCategory;
      if (postalCode !== null) filters.postalCode = postalCode;

      const bookData = await getBooks(
        Object.keys(filters).length ? filters : undefined,
      );
      const sortedBooks = bookData
        ? [...bookData].sort((a, b) => b.id - a.id)
        : [];
      setBooks(sortedBooks);
      setIsLoading(false);
    };
    loadBookData();
  }, [selectedCategory, postalCode]);

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
            <>
              <Button
                size="small"
                variant="outlined"
                disableRipple
                startIcon={<LocationOnIcon />}
                onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
                sx={{
                  whiteSpace: "nowrap",
                  minWidth: "150px",
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  borderRadius: "10px",
                  flexShrink: 0,
                  backgroundColor:
                    postalCode && !anchorEl ? "black" : "#f7f2ec",
                  color: postalCode && !anchorEl ? "#f7f2ec" : "black",
                }}
              >
                {!postalCode || anchorEl ? "Localisation" : postalCode}
              </Button>
              <PostalCodePopover
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                postalCodes={postalCodes}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
              />
              {categories &&
                categories.map((category: Category, index: number) => {
                  const isSelected = category.id === selectedCategory;
                  return (
                    <Button
                      key={index}
                      size="small"
                      variant="outlined"
                      onClick={() => handleCategoryClick(category.id)}
                      sx={{
                        whiteSpace: "nowrap",
                        minWidth: "150px",
                        textTransform: "none",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        borderRadius: "10px",
                        flexShrink: 0,
                        backgroundColor: isSelected ? "black" : "#f7f2ec",
                        color: isSelected ? "#f7f2ec" : "black",
                      }}
                    >
                      {category.name}
                    </Button>
                  );
                })}
            </>
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
            {"Récemment ajoutés"}
          </Typography>
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 5, lg: 5, xl: 6 }}
            rowSpacing={3}
            columnSpacing={2.5}
          >
            {filteredBooks && filteredBooks.length > 0
              ? filteredBooks.map((book: Book, index: number) => (
                  <Grid key={index} size={1}>
                    <BookCard book={book} />
                  </Grid>
                ))
              : !isLoading && (
                  <Typography paddingY={1}>Aucun livre trouvé.</Typography>
                )}
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
