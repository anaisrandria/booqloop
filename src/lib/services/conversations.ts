// Créer une conversation
export const createConversation = async (
  borrowerId: number,
  bookId: number,
) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      borrower_id: borrowerId,
      book_id: bookId,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error.detail || 'Erreur lors de la création de la conversation',
    );
  }

  return res.json();
};

// Liste des conversations
export const getConversations = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des conversations:');
  }
  return res.json();
};

// Messages d'une conversation
export const getMessages = async (conversationId: number) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversationId}/messages`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des messages');
  }
  return res.json();
};

// Envoyer un message
export const sendMessage = async (conversationId: number, content: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversationId}/messages`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    },
  );
  if (!res.ok) {
    throw new Error("Erreur lors de l'envoi du message");
  }
  return res.json();
};
