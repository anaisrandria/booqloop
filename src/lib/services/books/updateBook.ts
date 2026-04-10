import { BookFormData } from "@/app/components/BookForm/BookForm.types";
import { getDefaultOptions } from "../utils";

export const updateBook = async (bookId: number, data: BookFormData) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`;
  const res = await fetch(url, getDefaultOptions('PUT', data));
  if (!res.ok) throw new Error('Impossible de modifier le livre');
  return res.json();
};