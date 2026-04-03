export const getCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/categories/all`,
  );
  if (!response.ok) {
    throw new Error('Impossible de récupérer les catégories');
  }
  const categories = await response.json();
  return categories;
};
