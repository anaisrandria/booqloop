import { LoginFormData } from '@/app/(admin)/login/LoginForm.types';
import { getDefaultOptions } from '../utils';

export const loginUser = async (data: LoginFormData) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
  const res = await fetch(url, getDefaultOptions('POST', data));
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Erreur lors de la connexion');
  }
  return res.json();
};
