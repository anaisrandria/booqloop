import { Book } from "@/app/types";

  export const getBooks = async (): Promise<Book[] | null> => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
=======
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/get-books`);
>>>>>>> 348987d (feat(books): new books folder in app/services)
=======
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
>>>>>>> a64f812 (feat(books): adapt book endpoints to rest conventions)
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