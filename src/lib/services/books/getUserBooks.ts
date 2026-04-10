import { Book } from "@/app/types";
import { getDefaultOptions } from "../utils";

export const getUserBooks = async (): Promise<Book[] | null> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/books/user/me`;
  const res = await fetch(url, getDefaultOptions());
  if (!res.ok) {
    throw new Error('Impossible de récupérer vos livres');
  }
  return res.json();
};