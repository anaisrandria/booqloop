export const getCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
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