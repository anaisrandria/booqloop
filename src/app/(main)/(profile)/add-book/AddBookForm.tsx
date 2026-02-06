"use client";

import { useAuth } from "@/hooks/useAuth";
import addBook from "@/lib/services/books/addBook";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddBookFormData } from "./AddBookForm.types";
import { useRouter } from "next/navigation";
import { getCategories } from "@/lib/services/books/getCategories";
import { Category } from "@/app/types";

const AddBookForm = () => {
  const router = useRouter();
  const { userId } = useAuth();

  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    description: "",
    published_year: undefined,
    category_id: 1,
    image_url: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const categoryData: Category[] = await getCategories();
      setCategories(categoryData);
    };
    loadCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      const newBook: AddBookFormData = {
        title: bookForm.title,
        author: bookForm.author,
        description: bookForm.description,
        published_year: bookForm.published_year,
        category_id: bookForm.category_id,
        image_url: bookForm.image_url,
        user_id: userId,
        availability_status_id: 1,
      };
      addBook(newBook);
      router.push("/home");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        paddingBottom: 15,
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        {"Ajouter un livre"}
      </Stack>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: {
            xs: "75%",
            sm: "60%",
          },
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="Titre"
            name="title"
            value={bookForm.title}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            type="search"
          />

          <TextField
            label="Auteur·ice"
            name="author"
            value={bookForm.author}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            type="search"
          />

          <TextField
            label="Description"
            name="description"
            value={bookForm.description}
            onChange={handleChange}
            multiline
            rows={5}
            required
            fullWidth
            size="small"
            type="search"
          />

          <TextField
            label="Année de publication"
            name="published_year"
            value={bookForm.published_year}
            onChange={handleChange}
            fullWidth
            size="small"
            type="search"
          />

          <TextField
            select
            label="Catégorie"
            name="category_id"
            value={bookForm.category_id}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            type="search"
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="URL de l’image"
            name="image_url"
            value={bookForm.image_url}
            onChange={(e) => {
              handleChange(e);
            }}
            size="small"
            type="search"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "black",
              textTransform: "none",
              borderRadius: "5px",
            }}
          >
            {"Ajouter à ma bibliothèque"}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default AddBookForm;
