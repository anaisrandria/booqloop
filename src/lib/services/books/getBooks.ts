import { Book } from "@/app/types";

  export const getBooks = async (filters?: { categoryId?: number; postalCode?: number}): Promise<Book[] | null> => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
=======
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/get-books`);
>>>>>>> 348987d (feat(books): new books folder in app/services)
=======
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
>>>>>>> a64f812 (feat(books): adapt book endpoints to rest conventions)
=======
      const params = new URLSearchParams();
      if (filters?.categoryId !== undefined) params.append("category_id", filters.categoryId.toString());
      if (filters?.postalCode !== undefined) params.append("postal_code", filters.postalCode.toString());
    
        // Ajoute les params s'il y en a
      const queryString = params.toString();
      const url = queryString
        ? `${process.env.NEXT_PUBLIC_API_URL}/books?${queryString}`
        : `${process.env.NEXT_PUBLIC_API_URL}/books`;

        console.log("URL", url)
      const response = await fetch(url);
>>>>>>> 3f146bc (feat(books): handle backend book filtering)
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