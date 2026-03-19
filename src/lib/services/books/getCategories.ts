export const getCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/categories/all`,
    );
    if (!response.ok) {
      throw new Error('Impossible de récupérer les catégories');
    }
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    return null;
  }
};
