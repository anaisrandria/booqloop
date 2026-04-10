"use client";

import {
  Alert,
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BookFormData, BookFormProps } from "./BookForm.types";
import { getCategories } from "@/lib/services/books/getCategories";
import { Category } from "@/app/types";

const BookForm = ({
  initialData,
  onSubmit,
  submitLabel,
  title,
}: BookFormProps) => {
  const [bookForm, setBookForm] = useState({
    title: initialData?.title ?? "",
    author: initialData?.author ?? "",
    description: initialData?.description ?? "",
    published_year: initialData?.published_year ?? undefined,
    category_id: initialData?.category_id ?? 0,
    image_url: initialData?.image_url ?? "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData: Category[] = await getCategories();
        setCategories(categoryData);
        if (categoryData.length > 0 && !initialData) {
          setBookForm((prev) => ({ ...prev, category_id: categoryData[0].id }));
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      }
    };
    loadCategories();
  }, [initialData]);

  useEffect(() => {
    if (initialData) {
      setBookForm({
        title: initialData.title ?? "",
        author: initialData.author ?? "",
        description: initialData.description ?? "",
        published_year: initialData.published_year ?? undefined,
        category_id: initialData.category_id ?? 0,
        image_url: initialData.image_url ?? "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]:
        name === "published_year" ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: BookFormData = {
      title: bookForm.title,
      author: bookForm.author,
      description: bookForm.description,
      published_year: bookForm.published_year,
      category_id: bookForm.category_id,
      image_url: bookForm.image_url,
      availability_status_id: 1,
    };
    try {
      await onSubmit(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
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
        {title}
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
            value={bookForm.published_year ?? ""}
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
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="URL de l'image"
            name="image_url"
            value={bookForm.image_url}
            onChange={handleChange}
            size="small"
            type="search"
            fullWidth
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
            {submitLabel}
          </Button>
          {error && (
            <Alert variant="filled" severity="error" sx={{ marginTop: 1 }}>
              {error}
            </Alert>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default BookForm;
