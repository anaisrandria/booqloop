import { renderHook, waitFor, act } from '@testing-library/react';
import { useConversations } from './useConversations';
import {
  getConversationsList,
  getMessagesList,
} from '@/lib/services/conversations';
import { getBook } from '@/lib/services/books/getBook';
import { getUserById } from '@/lib/services/users/users';

// --- Mocks des dépendances externes ---

// On mock Next.js navigation pour éviter les erreurs liées au contexte Next
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => null, // pas de conversationId dans l'URL par défaut
  }),
}));

// On mock useAuth pour simuler un utilisateur connecté
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ userId: 5 }),
}));

// On mock les services pour ne pas faire de vrais appels API
jest.mock('@/lib/services/conversations');
jest.mock('@/lib/services/books/getBook');
jest.mock('@/lib/services/users/users');

// --- Données de test ---
const fakeConversations = [
  { id: 1, book_id: 10, borrower_id: 8, created_at: '2024-01-01T10:00:00Z' },
  { id: 2, book_id: 20, borrower_id: 9, created_at: '2024-01-02T10:00:00Z' },
];

const fakeMessages = [
  {
    id: 1,
    content: 'Bonjour',
    sender_id: 8,
    created_at: '2024-01-03T10:00:00Z',
  },
];

const fakeBook = {
  id: 10,
  title: 'Le Petit Prince',
  author: 'Saint-Exupéry',
  image_url: 'https://example.com/book.jpg',
  user: { id: 5, username: 'Alice' },
};

const fakeUser = { id: 8, username: 'Bob' };

beforeEach(() => {
  jest.clearAllMocks();

  // Valeurs par défaut des mocks
  (getConversationsList as jest.Mock).mockResolvedValue(fakeConversations);
  (getMessagesList as jest.Mock).mockResolvedValue(fakeMessages);
  (getBook as jest.Mock).mockResolvedValue(fakeBook);
  (getUserById as jest.Mock).mockResolvedValue(fakeUser);
});

// --- Tests ---

describe('useConversations — chargement initial', () => {
  it('charge les conversations au montage', async () => {
    const { result } = renderHook(() => useConversations());

    // On attend que le chargement async soit terminé
    await waitFor(() => {
      expect(result.current.sortedConversations).toHaveLength(2);
    });

    expect(getConversationsList).toHaveBeenCalledTimes(1);
  });

  it('ne charge pas les conversations si userId est null', async () => {
    // On surcharge le mock useAuth pour simuler un utilisateur non connecté
    jest.mock('@/hooks/useAuth', () => ({
      useAuth: () => ({ userId: null }),
    }));

    const { result } = renderHook(() => useConversations());

    await waitFor(() => {
      expect(result.current.sortedConversations).toHaveLength(0);
    });
  });
});

describe('useConversations — tri des conversations', () => {
  it('trie les conversations par activité la plus récente en premier', async () => {
    // La conversation 2 a un message plus récent → doit apparaître en premier
    (getMessagesList as jest.Mock)
      .mockResolvedValueOnce([]) // conv 1 : pas de message
      .mockResolvedValueOnce([
        // conv 2 : message récent
        {
          id: 2,
          content: 'Récent',
          sender_id: 9,
          created_at: '2024-06-01T10:00:00Z',
        },
      ]);

    const { result } = renderHook(() => useConversations());

    await waitFor(() => {
      expect(result.current.sortedConversations[0].id).toBe(2);
    });
  });

  it('utilise la date de création si aucun message', async () => {
    // Les deux conversations n'ont pas de messages
    (getMessagesList as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useConversations());

    await waitFor(() => {
      // La conversation 2 (created_at plus récent) doit être en premier
      expect(result.current.sortedConversations[0].id).toBe(2);
    });
  });
});

describe("useConversations — sélection d'une conversation", () => {
  it('charge les messages quand on sélectionne une conversation', async () => {
    const { result } = renderHook(() => useConversations());

    await waitFor(() => {
      expect(result.current.sortedConversations).toHaveLength(2);
    });

    // Act — on sélectionne la conversation 1
    act(() => {
      result.current.setSelectedConversationId(1);
    });

    await waitFor(() => {
      expect(result.current.messages).toEqual(fakeMessages);
    });
  });

  it('vide les messages quand on désélectionne une conversation', async () => {
    const { result } = renderHook(() => useConversations());

    // D'abord on sélectionne
    act(() => {
      result.current.setSelectedConversationId(1);
    });

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(1);
    });

    // Puis on désélectionne
    act(() => {
      result.current.setSelectedConversationId(null);
    });

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(0);
    });
  });
});

describe('useConversations — chargement des détails', () => {
  it('charge les livres et utilisateurs liés aux conversations', async () => {
    const { result } = renderHook(() => useConversations());

    await waitFor(() => {
      expect(result.current.booksById[10]).toEqual(fakeBook);
      expect(result.current.usersById[8]).toEqual(fakeUser);
    });
  });
});
