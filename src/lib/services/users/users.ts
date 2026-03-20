import { getDefaultOptions } from '../utils';

export type User = {
  id: number;
  username: string;
};

export const getCurrentUser = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/me`;
  const res = await fetch(url, getDefaultOptions());
  if (!res.ok) {
    throw new Error(`Erreur lors du chargement des données de l'utilisateur`);
  }
  const currentUser = await res.json();
  return currentUser;
};

export const getUserById = async (
  userId: number | undefined,
): Promise<User | null> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`;
  const res = await fetch(url, getDefaultOptions());
  if (!res.ok) {
    throw new Error(`Erreur lors du chargement des données de l'utilisateur`);
  }
  const user = await res.json();
  return user;
};
