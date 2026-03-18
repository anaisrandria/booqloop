import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

// Mock minimum pour éviter les erreurs
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

describe("LoginForm - rendu", () => {
  it("affiche les éléments de base", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByText(/se connecter/i)).toBeInTheDocument();
    expect(screen.getByText(/s'inscrire/i)).toBeInTheDocument();
  });
});
