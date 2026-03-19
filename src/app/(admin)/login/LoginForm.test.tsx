import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { loginUser } from "@/lib/services/admin/login";

const pushMock = jest.fn();
const loginMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    login: loginMock,
  }),
}));

jest.mock("@/lib/services/admin/login", () => ({
  loginUser: jest.fn(),
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

describe("LoginForm - interactions utilisateur", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("met à jour le champ email à la saisie", () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, {
      target: { name: "email", value: "test@example.com" },
    });

    expect(emailInput).toHaveValue("test@example.com");
  });

  it("met à jour le champ mot de passe à la saisie", () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/mot de passe/i);
    fireEvent.change(passwordInput, {
      target: { name: "password", value: "monmotdepasse" },
    });

    expect(passwordInput).toHaveValue("monmotdepasse");
  });

  it("appelle loginUser avec les bonnes données au clic sur Se connecter", async () => {
    (loginUser as jest.Mock).mockResolvedValue({ access_token: "fake-token" });
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: "email", value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { name: "password", value: "monmotdepasse" },
    });
    fireEvent.click(screen.getByText(/se connecter/i));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "monmotdepasse",
      });
    });
  });

  it("redirige vers /register au clic sur S'inscrire", () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByText(/s'inscrire/i));

    expect(pushMock).toHaveBeenCalledWith("/register");
  });
});

describe("LoginForm - connexion réussie", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("appelle login avec le bon token après une connexion réussie", async () => {
    (loginUser as jest.Mock).mockResolvedValue({ access_token: "fake-token" });
    render(<LoginForm />);

    fireEvent.click(screen.getByText(/se connecter/i));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("fake-token");
    });
  });

  it("redirige vers /home après une connexion réussie", async () => {
    (loginUser as jest.Mock).mockResolvedValue({ access_token: "fake-token" });
    render(<LoginForm />);

    fireEvent.click(screen.getByText(/se connecter/i));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/home");
    });
  });
});

describe("LoginForm - gestion des erreurs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("n'affiche pas d'alerte au rendu initial", () => {
    render(<LoginForm />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("affiche une alerte si loginUser rejette avec une Error", async () => {
    (loginUser as jest.Mock).mockRejectedValue(
      new Error("Identifiants invalides"),
    );
    render(<LoginForm />);

    fireEvent.click(screen.getByText(/se connecter/i));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/identifiants invalides/i)).toBeInTheDocument();
    });
  });

  it("affiche une alerte si loginUser rejette avec une valeur non-Error", async () => {
    (loginUser as jest.Mock).mockRejectedValue("Erreur inattendue");
    render(<LoginForm />);

    fireEvent.click(screen.getByText(/se connecter/i));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/erreur inattendue/i)).toBeInTheDocument();
    });
  });
});
