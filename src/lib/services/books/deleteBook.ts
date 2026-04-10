import { getDefaultOptions } from "../utils";

export const deleteBook = async (bookId: number): Promise<void> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`;
  const res = await fetch(url, getDefaultOptions('DELETE'));
  if (!res.ok) throw new Error('Impossible de supprimer le livre');
};