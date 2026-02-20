import { Book } from "@/app/types";

  export const getBook = async (bookId: number): Promise<Book | null> => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`);
=======
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/get-book/${bookId}`);
>>>>>>> 348987d (feat(books): new books folder in app/services)
=======
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`);
>>>>>>> a64f812 (feat(books): adapt book endpoints to rest conventions)
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const book = await response.json();
      return book;
    } catch (error) {
      console.error("Error fetching book:", error);
      return null;
    }
  };