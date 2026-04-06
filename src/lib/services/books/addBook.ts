import { BookFormData } from "@/app/components/BookForm/BookForm.types";
import { getDefaultOptions } from '../utils';

const addBook = async (data: BookFormData) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/books/`;
  const res = await fetch(url, getDefaultOptions('POST', data));
  console.log(data);
  if (!res.ok) {
    const error = await res.json();
    console.log('ERROR:', error.detail);
    throw new Error(error.detail || "Erreur lors de l'ajout du livre");
  }
  return res.json();
};

export default addBook;