import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import { registerUser } from "@/lib/services/admin/register";

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

jest.mock("@/lib/services/admin/register", () => ({
  registerUser: jest.fn(),
}));

describe("RegisterForm - rendu", () => {
  it("affiche les éléments de base", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ville/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/code postal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pays/i)).toBeInTheDocument();
    expect(screen.getByText(/créer un compte/i)).toBeInTheDocument();
    expect(screen.getByText(/se connecter/i)).toBeInTheDocument();
  });
});

describe("RegisterForm - interactions utilisateur", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("met à jour le champ nom d'utilisateur à la saisie", () => {
    render(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/nom d'utilisateur/i);
    fireEvent.change(usernameInput, {
      target: { name: "username", value: "johndoe" },
    });

    expect(usernameInput).toHaveValue("johndoe");
  });

  it("met à jour le champ email à la saisie", () => {
    render(<RegisterForm />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, {
      target: { name: "email", value: "test@example.com" },
    });

    expect(emailInput).toHaveValue("test@example.com");
  });

  it("met à jour le champ mot de passe à la saisie", () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/mot de passe/i);
    fireEvent.change(passwordInput, {
      target: { name: "password", value: "monmotdepasse" },
    });

    expect(passwordInput).toHaveValue("monmotdepasse");
  });

  it("met à jour le champ ville à la saisie", () => {
    render(<RegisterForm />);

    const addressInput = screen.getByLabelText(/ville/i);
    fireEvent.change(addressInput, {
      target: { name: "address", value: "Paris" },
    });

    expect(addressInput).toHaveValue("Paris");
  });

  it("met à jour le champ code postal à la saisie", () => {
    render(<RegisterForm />);

    const postalCodeInput = screen.getByLabelText(/code postal/i);
    fireEvent.change(postalCodeInput, {
      target: { name: "postalCode", value: "75001" },
    });

    expect(postalCodeInput).toHaveValue("75001");
  });

  it("met à jour le champ pays à la saisie", () => {
    render(<RegisterForm />);

    const countryInput = screen.getByLabelText(/pays/i);
    fireEvent.change(countryInput, {
      target: { name: "country", value: "France" },
    });

    expect(countryInput).toHaveValue("France");
  });

  it("appelle registerUser avec les bonnes données au clic sur Créer un compte", async () => {
    (registerUser as jest.Mock).mockResolvedValue({
      access_token: "fake-token",
    });
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), {
      target: { name: "username", value: "johndoe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: "email", value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { name: "password", value: "monmotdepasse" },
    });
    fireEvent.change(screen.getByLabelText(/ville/i), {
      target: { name: "address", value: "Paris" },
    });
    fireEvent.change(screen.getByLabelText(/code postal/i), {
      target: { name: "postalCode", value: "75001" },
    });
    fireEvent.change(screen.getByLabelText(/pays/i), {
      target: { name: "country", value: "France" },
    });
    fireEvent.click(screen.getByText(/créer un compte/i));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        username: "johndoe",
        email: "test@example.com",
        password: "monmotdepasse",
        address: "Paris",
        postalCode: "75001",
        country: "France",
      });
    });
  });

  it("redirige vers /login au clic sur Se connecter", () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByText(/se connecter/i));

    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});

describe("RegisterForm - inscription réussie", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("appelle login avec le bon token après une inscription réussie", async () => {
    (registerUser as jest.Mock).mockResolvedValue({
      access_token: "fake-token",
    });
    render(<RegisterForm />);

    fireEvent.click(screen.getByText(/créer un compte/i));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("fake-token");
    });
  });

  it("redirige vers /home après une inscription réussie", async () => {
    (registerUser as jest.Mock).mockResolvedValue({
      access_token: "fake-token",
    });
    render(<RegisterForm />);

    fireEvent.click(screen.getByText(/créer un compte/i));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/home");
    });
  });
});

describe("RegisterForm - gestion des erreurs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("n'affiche pas d'alerte au rendu initial", () => {
    render(<RegisterForm />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("affiche une alerte si registerUser rejette avec une Error", async () => {
    (registerUser as jest.Mock).mockRejectedValue(
      new Error("Email déjà utilisé"),
    );
    render(<RegisterForm />);

    fireEvent.click(screen.getByText(/créer un compte/i));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/email déjà utilisé/i)).toBeInTheDocument();
    });
  });

  it("affiche une alerte si registerUser rejette avec une valeur non-Error", async () => {
    (registerUser as jest.Mock).mockRejectedValue("Erreur inattendue");
    render(<RegisterForm />);

    fireEvent.click(screen.getByText(/créer un compte/i));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/erreur inattendue/i)).toBeInTheDocument();
    });
  });
});
