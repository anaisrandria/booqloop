import { getDefaultOptions } from './utils';

export const createConversation = async (
  borrowerId: number,
  bookId: number,
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/conversations`;
  const res = await fetch(
    url,
    getDefaultOptions('POST', {
      borrower_id: borrowerId,
      book_id: bookId,
    }),
  );
  if (!res.ok) {
    throw new Error('Erreur lors de la création de la conversations');
  }
  return res.json();
};

export const getConversationsList = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/conversations`;
  const res = await fetch(url, getDefaultOptions());
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des conversations:');
  }
  return res.json();
};

export const deleteConversation = async (conversationId: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversationId}`;
  const res = await fetch(url, getDefaultOptions('DELETE'));
  if (!res.ok) {
    throw new Error('Erreur lors de la suppression de la conversations');
  }
  return res.json();
};

export const getMessagesList = async (conversationId: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversationId}/messages`;
  const res = await fetch(url, getDefaultOptions());
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des messages');
  }
  return res.json();
};

export const sendMessage = async (conversationId: number, content: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversationId}/messages`;
  const res = await fetch(url, getDefaultOptions('POST', { content }));
  if (!res.ok) {
    throw new Error(`Erreur lors de l'envoi du message`);
  }
  return res.json();
};
