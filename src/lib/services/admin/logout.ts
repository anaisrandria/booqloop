import { getDefaultOptions } from '../utils';

export const logoutUser = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;
  const res = await fetch(url, getDefaultOptions('POST'));
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Erreur lors de la déconnexion');
  }
  return res.json();
};
