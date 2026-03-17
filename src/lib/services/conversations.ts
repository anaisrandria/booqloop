// Créer une conversation
export async function createConversation(borrowerId: number, bookId: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
}

// Liste des conversations
export async function getConversations(userId: number | null) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/conversations/${userId}`,
  );
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des conversations');
  }
  return res.json();
}

// Messages d'une conversation
export async function getMessages(conversationId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversationId}/messages`,
  );
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des messages');
  }
  return res.json();
}

// Envoyer un message
export async function sendMessage(
  conversationId: number,
  senderId: number,
  content: string,
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversationId}/messages`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sender_id: senderId, content }),
    },
  );
  if (!res.ok) {
    throw new Error("Erreur lors de l'envoi du message");
  }
  return res.json();
}
