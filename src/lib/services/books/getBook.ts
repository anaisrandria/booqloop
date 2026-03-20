import { Book } from '@/app/types';

export const getBook = async (bookId: number): Promise<Book | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`,
  );
  if (!response.ok) {
    throw new Error('Impossible de récupérer les données du livre');
  }
  const book = await response.json();
  return book;
};
