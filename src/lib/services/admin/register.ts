import { RegisterFormData } from "@/app/(admin)/register/RegisterForm.types";

export async function registerUser(data: RegisterFormData) {

const { postalCode, ...rest } = data;

  const payload = {
    ...rest,
    postal_code: Number(postalCode),
  };


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Registration error");
  }

  return res.json();
}
