import { RegisterFormData } from '@/app/(admin)/register/RegisterForm.types';
import { getDefaultOptions } from '../utils';

export const registerUser = async (data: RegisterFormData) => {
  const { postalCode, ...rest } = data;
  const payload = {
    ...rest,
    postal_code: Number(postalCode),
  };

  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
  const res = await fetch(url, getDefaultOptions('POST', payload));
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Erreur lors de l'inscription");
  }
  return res.json();
};
