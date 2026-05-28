"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Book, Category } from "../../types";
import { getCategories } from "@/lib/services/books/getCategories";
import { useEffect, useState } from "react";
import { getBooks } from "@/lib/services/books/getBooks";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AddressPopover } from "@/app/components/AddressPopover";
import { useSearch } from "@/hooks/useSearch";
import { useAuth } from "../../../hooks/useAuth";
import BookGrid from "@/app/components/BookGrid/BookGrid";
import { AddressOption } from "../../types";

const Home = () => {
  const { searchQuery } = useSearch();
  const { username } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedAddresses, setSelectedAddresses] = useState<AddressOption[]>(
    [],
  );
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const truncatedLabel =
    selectedAddresses.length === 0
      ? ""
      : selectedAddresses.length === 1
        ? selectedAddresses[0].label
        : `${selectedAddresses[0].label}, +${selectedAddresses.length - 1}`;

  const filteredBooks = books
    ?.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((book) =>
      selectedAddresses.length === 0
        ? true
        : selectedAddresses.some(
            (c) =>
              c.postalCode === book.user.postal_code.toString() &&
              c.name === book.user.address,
          ),
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
  }, [selectedCategory]);

  return (
    <Container maxWidth="md">
      <Stack spacing={4}>
        {username && <Typography>Bienvenue {username} ! </Typography>}
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
                  fontWeight: 600,
                  borderRadius: "10px",
                  flexShrink: 0,
                  backgroundColor:
                    selectedAddresses.length > 0 && !anchorEl
                      ? "black"
                      : "#f7f2ec",
                  color:
                    selectedAddresses.length > 0 && !anchorEl
                      ? "#f7f2ec"
                      : "black",
                }}
              >
                {selectedAddresses.length === 0 || anchorEl
                  ? "Localisation"
                  : truncatedLabel}
              </Button>
              <AddressPopover
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                selectedAddresses={selectedAddresses}
                setSelectedAddresses={setSelectedAddresses}
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
        <BookGrid
          books={filteredBooks}
          isLoading={isLoading}
          header={"Récemment ajoutés"}
        />
      </Stack>
    </Container>
  );
};

export default Home;
