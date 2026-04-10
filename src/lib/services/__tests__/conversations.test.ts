import {
  getConversationsList,
  getMessagesList,
  createConversation,
  deleteConversation,
  sendMessage,
} from '../conversations';

// On mock fetch globalement — tous les appels fetch seront simulés
global.fetch = jest.fn();

// Petite fonction utilitaire pour simuler une réponse fetch réussie
const mockFetchSuccess = (data: unknown) => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  });
};

// Petite fonction utilitaire pour simuler une réponse fetch échouée
const mockFetchError = () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    json: async () => ({ detail: 'Erreur serveur' }),
  });
};

// On remet le mock à zéro avant chaque test pour qu'ils soient indépendants
beforeEach(() => {
  jest.clearAllMocks();
});

// --- Tests de getConversationsList ---
describe('getConversationsList', () => {
  it('retourne la liste des conversations si la requête réussit', async () => {
    // Arrange — on prépare la fausse réponse API
    const fakeConversations = [
      { id: 1, book_id: 10, borrower_id: 5, created_at: '2024-01-01' },
      { id: 2, book_id: 20, borrower_id: 6, created_at: '2024-01-02' },
    ];
    mockFetchSuccess(fakeConversations);

    // Act — on appelle la fonction
    const result = await getConversationsList();

    // Assert — on vérifie le résultat
    expect(result).toEqual(fakeConversations);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('lance une erreur si la requête échoue', async () => {
    // Arrange
    mockFetchError();

    // Act & Assert — on vérifie que l'erreur est bien lancée
    await expect(getConversationsList()).rejects.toThrow(
      'Erreur lors du chargement des conversations',
    );
  });
});

// --- Tests de getMessagesList ---
describe('getMessagesList', () => {
  it("retourne les messages d'une conversation", async () => {
    const fakeMessages = [
      { id: 1, content: 'Bonjour', sender_id: 5, created_at: '2024-01-01' },
    ];
    mockFetchSuccess(fakeMessages);

    const result = await getMessagesList(1);

    expect(result).toEqual(fakeMessages);
    // On vérifie que l'URL contient bien l'id de la conversation
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/conversations/1/messages'),
      expect.any(Object),
    );
  });

  it('lance une erreur si la requête échoue', async () => {
    mockFetchError();
    await expect(getMessagesList(1)).rejects.toThrow(
      'Erreur lors du chargement des messages',
    );
  });
});

// --- Tests de createConversation ---
describe('createConversation', () => {
  it('crée une conversation et retourne les données', async () => {
    const fakeConversation = { id: 3, book_id: 30, borrower_id: 7 };
    mockFetchSuccess(fakeConversation);

    const result = await createConversation(7, 30);

    expect(result).toEqual(fakeConversation);
    // On vérifie que la méthode HTTP est bien POST
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/conversations'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('lance une erreur si la création échoue', async () => {
    mockFetchError();
    await expect(createConversation(7, 30)).rejects.toThrow(
      'Erreur lors de la création de la conversations',
    );
  });
});

// --- Tests de deleteConversation ---
describe('deleteConversation', () => {
  it('supprime une conversation', async () => {
    mockFetchSuccess({ message: 'Conversation supprimée avec succès' });

    const result = await deleteConversation(1);

    expect(result).toEqual({ message: 'Conversation supprimée avec succès' });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/conversations/1'),
      expect.objectContaining({ method: 'DELETE' }),
    );
  });

  it('lance une erreur si la suppression échoue', async () => {
    mockFetchError();
    await expect(deleteConversation(1)).rejects.toThrow(
      'Erreur lors de la suppression de la conversations',
    );
  });
});

// --- Tests de sendMessage ---
describe('sendMessage', () => {
  it('envoie un message et retourne les données', async () => {
    const fakeMessage = { id: 10, content: 'Bonjour', sender_id: 5 };
    mockFetchSuccess(fakeMessage);

    const result = await sendMessage(1, 'Bonjour');

    expect(result).toEqual(fakeMessage);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/conversations/1/messages'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it("lance une erreur si l'envoi échoue", async () => {
    mockFetchError();
    await expect(sendMessage(1, 'Bonjour')).rejects.toThrow(
      "Erreur lors de l'envoi du message",
    );
  });
});
