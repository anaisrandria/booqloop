import { LoginFormData } from "@/app/(admin)/login/LoginForm.types";

export const loginUser = async (data: LoginFormData) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Erreur lors de la connexion");
  }

  return res.json();
};