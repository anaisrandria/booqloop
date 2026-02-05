// Liste des conversations
export async function getConversations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations`);
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
