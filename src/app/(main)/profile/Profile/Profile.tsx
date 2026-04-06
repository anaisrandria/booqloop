import BookGrid from "@/app/components/BookGrid/BookGrid";
import { Book } from "@/app/types";
import { getUserBooks } from "@/lib/services/books/getUserBooks";
import { Button, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const Profile = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadBookData = async () => {
      setIsLoading(true);

      const bookData = await getUserBooks();
      const sortedBooks = bookData
        ? [...bookData].sort((a, b) => b.id - a.id)
        : [];
      setBooks(sortedBooks);
      setIsLoading(false);
    };
    loadBookData();
  }, []);

  return (
    <Container maxWidth="md">
      <Stack gap={2}>
        <BookGrid
          books={books}
          isLoading={isLoading}
          header={"Ma bibliothèque"}
          showEditIcons={true}
        />
      </Stack>
    </Container>
  );
};

export default Profile;
