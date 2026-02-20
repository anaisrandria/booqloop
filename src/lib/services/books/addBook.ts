import { AddBookFormData } from '../../../app/(main)/(profile)/add-book/AddBookForm.types';

const addBook = async (data: AddBookFormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Registration error');
  }

  return res.json();
};

export default addBook;
