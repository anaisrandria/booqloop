import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookForm from "./BookForm";
import { getCategories } from "@/lib/services/books/getCategories";

jest.mock("@/lib/services/books/getCategories", () => ({
  getCategories: jest.fn(),
}));

const mockCategories = [
  { id: 1, name: "Roman" },
  { id: 2, name: "Science-fiction" },
];

const mockOnSubmit = jest.fn();

describe("BookForm - rendu", () => {
  beforeEach(() => {
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche les éléments de base", async () => {
    render(
      <BookForm
        title="Ajouter un livre"
        submitLabel="Ajouter à ma bibliothèque"
        onSubmit={mockOnSubmit}
      />,
    );

    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    expect(screen.getByLabelText(/titre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/auteur·ice/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/année de publication/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/catégorie/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url de l'image/i)).toBeInTheDocument();
    expect(screen.getByText(/ajouter à ma bibliothèque/i)).toBeInTheDocument();
  });

  it("charge et affiche les catégories", async () => {
    render(
      <BookForm
        title="Ajouter un livre"
        submitLabel="Ajouter à ma bibliothèque"
        onSubmit={mockOnSubmit}
      />,
    );

    await waitFor(() => expect(getCategories).toHaveBeenCalled());
  });
});

describe("BookForm - interactions utilisateur", () => {
  beforeEach(() => {
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("met à jour le champ titre à la saisie", async () => {
    render(
      <BookForm
        title="Ajouter un livre"
        submitLabel="Ajouter à ma bibliothèque"
        onSubmit={mockOnSubmit}
      />,
    );
    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    const titleInput = screen.getByLabelText(/titre/i);
    fireEvent.change(titleInput, {
      target: { name: "title", value: "Les Misérables" },
    });

    expect(titleInput).toHaveValue("Les Misérables");
  });

  it("met à jour le champ auteur à la saisie", async () => {
    render(
      <BookForm
        title="Ajouter un livre"
        submitLabel="Ajouter à ma bibliothèque"
        onSubmit={mockOnSubmit}
      />,
    );
    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    const authorInput = screen.getByLabelText(/auteur·ice/i);
    fireEvent.change(authorInput, {
      target: { name: "author", value: "Victor Hugo" },
    });

    expect(authorInput).toHaveValue("Victor Hugo");
  });

  it("met à jour le champ description à la saisie", async () => {
    render(
      <BookForm
        title="Ajouter un livre"
        submitLabel="Ajouter à ma bibliothèque"
        onSubmit={mockOnSubmit}
      />,
    );
    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    const descriptionInput = screen.getByLabelText(/description/i);
    fireEvent.change(descriptionInput, {
      target: { name: "description", value: "Un grand roman." },
    });

    expect(descriptionInput).toHaveValue("Un grand roman.");
  });

  it("met à jour le champ année de publication à la saisie", async () => {
    render(
      <BookForm
        title="Ajouter un livre"
        submitLabel="Ajouter à ma bibliothèque"
        onSubmit={mockOnSubmit}
      />,
    );
    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    const yearInput = screen.getByLabelText(/année de publication/i);
    fireEvent.change(yearInput, {
      target: { name: "published_year", value: "1862" },
    });

    expect(yearInput).toHaveValue("1862");
  });

  it("met à jour le champ URL de l'image à la saisie", async () => {
    render(
      <BookForm
        title="Ajouter un livre"
        submitLabel="Ajouter à ma bibliothèque"
        onSubmit={mockOnSubmit}
      />,
    );
    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    const imageInput = screen.getByLabelText(/url de l'image/i);
    fireEvent.change(imageInput, {
      target: { name: "image_url", value: "https://example.com/image.jpg" },
    });

    expect(imageInput).toHaveValue("https://example.com/image.jpg");
  });
});

describe("BookForm - soumission du formulaire", () => {
  beforeEach(() => {
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
    mockOnSubmit.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("appelle onSubmit avec les bonnes données à la soumission", async () => {
    render(
      <BookForm
        title="Ajouter un livre"
        submitLabel="Ajouter à ma bibliothèque"
        onSubmit={mockOnSubmit}
      />,
    );

    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    fireEvent.change(screen.getByLabelText(/titre/i), {
      target: { name: "title", value: "Les Misérables" },
    });
    fireEvent.change(screen.getByLabelText(/auteur·ice/i), {
      target: { name: "author", value: "Victor Hugo" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { name: "description", value: "Un grand roman." },
    });
    fireEvent.change(screen.getByLabelText(/année de publication/i), {
      target: { name: "published_year", value: "1862" },
    });
    fireEvent.change(screen.getByLabelText(/url de l'image/i), {
      target: { name: "image_url", value: "https://example.com/image.jpg" },
    });

    fireEvent.submit(
      screen.getByRole("button", { name: /ajouter à ma bibliothèque/i }),
    );

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Les Misérables",
        author: "Victor Hugo",
        description: "Un grand roman.",
        published_year: 1862,
        category_id: 1,
        image_url: "https://example.com/image.jpg",
        availability_status_id: 1,
      });
    });
  });
});

describe("BookForm - gestion des erreurs", () => {
  beforeEach(() => {
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("n'affiche pas d'alerte au rendu initial", async () => {
    render(
      <BookForm
        title="Ajouter un livre"
        submitLabel="Ajouter à ma bibliothèque"
        onSubmit={mockOnSubmit}
      />,
    );
    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("affiche une alerte si onSubmit rejette avec une Error", async () => {
    mockOnSubmit.mockRejectedValue(new Error("Erreur lors de l'ajout"));

    render(
      <BookForm
        title="Ajouter un livre"
        submitLabel="Ajouter à ma bibliothèque"
        onSubmit={mockOnSubmit}
      />,
    );
    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    fireEvent.submit(
      screen.getByRole("button", { name: /ajouter à ma bibliothèque/i }),
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/erreur lors de l'ajout/i)).toBeInTheDocument();
    });
  });

  it("affiche une alerte si onSubmit rejette avec une valeur non-Error", async () => {
    mockOnSubmit.mockRejectedValue("erreur inattendue");

    render(
      <BookForm
        title="Ajouter un livre"
        submitLabel="Ajouter à ma bibliothèque"
        onSubmit={mockOnSubmit}
      />,
    );
    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    fireEvent.submit(
      screen.getByRole("button", { name: /ajouter à ma bibliothèque/i }),
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/erreur inattendue/i)).toBeInTheDocument();
    });
  });
});
