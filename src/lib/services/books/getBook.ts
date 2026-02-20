import { Book } from "@/app/types";

  export const getBook = async (bookId: number): Promise<Book | null> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`);
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