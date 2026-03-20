import { AddBookFormData } from '../../../app/(main)/(profile)/add-book/AddBookForm.types';

const addBook = async (data: AddBookFormData) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Erreur lors de l'ajout du livre");
  }

  return res.json();
};

export default addBook;