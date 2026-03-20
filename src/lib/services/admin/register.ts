import { RegisterFormData } from "@/app/(admin)/register/RegisterForm.types";

export const registerUser = async (data: RegisterFormData) => {
  const { postalCode, ...rest } = data;

  const payload = {
    ...rest,
    postal_code: Number(postalCode),
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Erreur lors de l'inscription");
  }

  return res.json();
};