import { AddBookFormData } from '../../../app/(main)/(profile)/add-book/AddBookForm.types';

const addBook = async (data: AddBookFormData) => {
  const token = localStorage.getItem('token');
  console.log('✅:', token);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Registration error');
  }

  return res.json();
};

export default addBook;
