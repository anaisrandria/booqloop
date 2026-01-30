import { LoginFormData } from "@/app/(admin)/login/LoginForm.types";

export const loginUser = async (data: LoginFormData) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Connection error");
  }

  return res.json();
}
