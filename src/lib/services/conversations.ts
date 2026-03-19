import { getHeaders } from './utils';

export const createConversation = async (
  borrowerId: number,
  bookId: number,
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/conversations`;
    const res = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        borrower_id: borrowerId,
        book_id: bookId,
      }),
    });
    if (!res.ok) {
      throw new Error('Erreur lors de la création de la conversations');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Impossible de créer la conversation`);
  }
};

export const getConversationsList = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/conversations`;
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) {
      throw new Error('Erreur lors du chargement des conversations:');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Impossible de charger les conversations`);
  }
};

export const getMessagesList = async (conversationId: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversationId}/messages`;
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) {
      throw new Error('Erreur lors du chargement des messages');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Impossible de charger les messages`);
  }
};

export const sendMessage = async (conversationId: number, content: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversationId}/messages`;
    const res = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ content }),
    });
    if (!res.ok) {
      throw new Error(`Erreur lors de l'envoi du message`);
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Impossible d'envoyer le message`);
  }
};
