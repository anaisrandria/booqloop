export const getCategories = async () => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
=======
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/get-categories`);
>>>>>>> 348987d (feat(books): new books folder in app/services)
=======
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
>>>>>>> a64f812 (feat(books): adapt book endpoints to rest conventions)
      if (!response.ok) {
        throw new Error("Failed to fetch categories data");
      }
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error("Error fetching all categories:", error);
      return null;
    }
  };