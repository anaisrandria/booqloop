import { getHeaders } from '../utils';

export type User = {
  id: number;
  username: string;
};

export const getUserById = async (
  userId: number | undefined,
): Promise<User | null> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`;
    const response = await fetch(url, { headers: getHeaders() });

    if (!response.ok) {
      throw new Error(`Erreur lors du chargement des données de l'utilisateur`);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error(`Impossible de charger les données de l'utilisateur`);
  }
};
