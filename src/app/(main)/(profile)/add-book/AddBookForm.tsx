"use client";

import { useAuth } from "@/hooks/useAuth";
import addBook from "@/lib/services/admin/addBook";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { AddBookFormData } from "./AddBookForm.types";
import { useRouter } from "next/navigation";

const mockCategories = [
  { id: 1, name: "Littérature" },
  { id: 2, name: "Science fiction" },
  { id: 3, name: "Fantasy" },
  { id: 4, name: "Romance" },
  { id: 5, name: "Jeunesse" },
  { id: 6, name: "Bande dessinée / Manga" },
  { id: 7, name: "Développement personnel" },
  { id: 8, name: "Histoire" },
  { id: 9, name: "Sciences et Technologies" },
  { id: 10, name: "Philosophie" },
  { id: 11, name: "Économie et Gestion" },
  { id: 12, name: "Art et Culture" },
  { id: 13, name: "Cuisine" },
  { id: 14, name: "Santé et Bien-être" },
  { id: 15, name: "Voyage" },
  { id: 16, name: "Policier / Thriller" },
  { id: 17, name: "Documentaire / Essai" },
  { id: 18, name: "Éducation / Pédagogie" },
  { id: 19, name: "Pratique / Loisirs" },
];

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
            {mockCategories.map((cat) => (
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
              // setImageError(false);
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
