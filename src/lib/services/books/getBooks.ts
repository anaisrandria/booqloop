import { Book } from "@/app/types";

  export const getBooks = async (): Promise<Book[] | null> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
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