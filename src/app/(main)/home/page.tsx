"use client";

import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Book, Category } from "../../types";
import { BookCard } from "@/app/components/BookCard";
import { getCategories } from "@/lib/services/books/getCategories";
import { useEffect, useState } from "react";
import { getBooks } from "@/lib/services/books/getBooks";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [books, setBooks] = useState<Book[] | null>([]);
  const [postalCode, setPostalCode] = useState<number>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const postalCodes = [1, 10001, 75001, 75002, 75003, 75004, 75005];

  console.log("BOOKS", books);

  const filteredBooks = postalCode
    ? books?.filter((book) => book.user.postal_code === postalCode)
    : books;

  useEffect(() => {
    const loadData = async () => {
      const categoryData = await getCategories();
      setCategories(categoryData);
      const bookData = await getBooks();
      const sortedBooks = bookData
        ? [...bookData].sort((a, b) => b.id - a.id)
        : [];
      setBooks(sortedBooks);
    };
    loadData();
  }, []);

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
              <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box sx={{ p: 2, width: 200 }}>
                  <Autocomplete
                    options={postalCodes}
                    value={postalCode ?? null}
                    getOptionLabel={(option) => option.toString()}
                    onChange={(event, value) => {
                      setPostalCode(value ?? undefined);
                      setAnchorEl(null);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Code postal"
                      />
                    )}
                  />
                </Box>
              </Popover>
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
            {filteredBooks && filteredBooks.length > 0 ? (
              filteredBooks.map((book: Book, index: number) => (
                <Grid key={index} size={1}>
                  <BookCard book={book} />
                </Grid>
              ))
            ) : (
              <Typography paddingY={1}>Aucun livre trouvé.</Typography>
            )}
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
