import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import {
  getConversationsList,
  getMessagesList,
} from '@/lib/services/conversations';
import { getBook } from '@/lib/services/books/getBook';
import { getUserById, User } from '@/lib/services/users/users';
import { Book } from '@/app/types';
import { Conversation, Message } from './Conversations.types';

export const useConversations = () => {
  const { userId } = useAuth();
  const searchParams = useSearchParams();

  // --- États ---
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessages, setLastMessages] = useState<
    Record<number, Message | null>
  >({});
  const [booksById, setBooksById] = useState<Record<number, Book | null>>({});
  const [usersById, setUsersById] = useState<Record<number, User | null>>({});

  // --- Charge les messages d'une conversation et met à jour le dernier message ---
  const loadMessages = async (conversationId: number) => {
    try {
      const data = await getMessagesList(conversationId);
      setMessages(data);
      setLastMessages((prev) => ({
        ...prev,
        [conversationId]: data.length > 0 ? data[data.length - 1] : null,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  // --- Charge le dernier message de chaque conversation (pour l'aperçu dans la liste) ---
  const loadLastMessages = async (conversationsList: Conversation[]) => {
    try {
      // On lance tous les appels API en parallèle pour aller plus vite
      const results = await Promise.all(
        conversationsList.map(async (conversation) => {
          const data = await getMessagesList(conversation.id);
          return {
            conversationId: conversation.id,
            lastMessage: data.length > 0 ? data[data.length - 1] : null,
          };
        }),
      );

      // On construit un objet { conversationId: dernierMessage }
      const map: Record<number, Message | null> = {};
      results.forEach(({ conversationId, lastMessage }) => {
        map[conversationId] = lastMessage;
      });

      setLastMessages(map);
    } catch (error) {
      console.error(error);
    }
  };

  // --- Charge les livres et utilisateurs liés à chaque conversation ---
  // Ces infos servent à afficher le titre du livre et le nom de l'interlocuteur dans la liste
  const loadConversationDetails = async (conversationsList: Conversation[]) => {
    try {
      const booksMap: Record<number, Book | null> = {};
      const usersMap: Record<number, User | null> = {};

      for (const conversation of conversationsList) {
        // On évite de charger un livre déjà chargé
        if (!booksMap[conversation.book_id]) {
          const book = await getBook(conversation.book_id);
          booksMap[conversation.book_id] = book;

          // On charge le propriétaire du livre si pas encore chargé
          if (book && !usersMap[book.user?.id]) {
            usersMap[book.user?.id] = await getUserById(book.user?.id);
          }
        }

        // On charge l'emprunteur si pas encore chargé
        if (!usersMap[conversation.borrower_id]) {
          usersMap[conversation.borrower_id] = await getUserById(
            conversation.borrower_id,
          );
        }
      }

      setBooksById(booksMap);
      setUsersById(usersMap);
    } catch (error) {
      console.error(error);
    }
  };

  // --- Charge toutes les conversations au démarrage ---
  const loadConversations = async () => {
    try {
      const data = await getConversationsList();
      setConversations(data);

      // Si l'URL contient ?conversationId=X, on pré-sélectionne cette conversation
      const conversationId = searchParams.get('conversationId');
      if (conversationId) {
        setSelectedConversationId(Number(conversationId));
      }

      // On charge les aperçus et les détails en parallèle (au lieu de faire plusieurs await successifs)
      await Promise.all([
        loadLastMessages(data),
        loadConversationDetails(data),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  // --- Déclenche le chargement initial dès que l'userId est disponible ---
  useEffect(() => {
    if (!userId) return;
    loadConversations();
  }, [userId]);

  // --- Quand on sélectionne une conversation, on charge ses messages ---
  // Quand on désélectionne (null), on vide les messages affichés
  useEffect(() => {
    if (selectedConversationId === null) {
      setMessages([]);
      return;
    }
    loadMessages(selectedConversationId);
  }, [selectedConversationId]);

  // --- Trie les conversations par activité la plus récente ---
  // Si une conversation a des messages, on utilise la date du dernier message
  // Sinon on utilise la date de création de la conversation
  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => {
      const dateA =
        lastMessages[a.id]?.created_at ??
        a.created_at ??
        '1970-01-01T00:00:00Z';
      const dateB =
        lastMessages[b.id]?.created_at ??
        b.created_at ??
        '1970-01-01T00:00:00Z';
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  }, [conversations, lastMessages]);

  return {
    messages,
    lastMessages,
    booksById,
    usersById,
    sortedConversations,
    selectedConversationId,
    setSelectedConversationId,
    setConversations,
    loadMessages,
    currentUserId: userId,
  };
};
