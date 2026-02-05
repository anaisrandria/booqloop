'use client';
<<<<<<< HEAD
import { useEffect, useMemo, useState } from 'react';
import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getConversations, getMessages } from '@/lib/services/conversations';
import { Book } from '@/app/types';
import { getBook } from '@/lib/services/books/getBook';
import { getUserById, User } from '@/lib/services/users/getUserById';
import { useAuth } from '../../../hooks/useAuth';
import { Conversation, Message } from './Conversations.types';
import ConversationList from './ConversationsList';
import ConversationContent from './ConversationContent';

const ConversationsPage = () => {
  const { userId } = useAuth();

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const loadConversations = async () => {
    try {
      const data = await getConversations(userId);
      setConversations(data);
      await loadLastMessages(data);
      await getConversationDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMessages = async (conversationId: number) => {
    try {
      const data = await getMessages(conversationId);
      setMessages(data);
      setLastMessages((prev) => ({
        ...prev,
        [conversationId]: data.length > 0 ? data[data.length - 1] : null,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const loadLastMessages = async (conversationsList: Conversation[]) => {
    try {
      const results = await Promise.all(
        conversationsList.map(async (conversation) => {
          const data: Message[] = await getMessages(conversation.id);
          const lastMessage = data.length > 0 ? data[data.length - 1] : null;
          return { conversationId: conversation.id, lastMessage };
        }),
      );

      const map: Record<number, Message | null> = {};
      results.forEach(({ conversationId, lastMessage }) => {
        map[conversationId] = lastMessage;
      });

      setLastMessages(map);
    } catch (error) {
      console.error(error);
    }
  };

  const getConversationDetails = async (conversationsList: Conversation[]) => {
    try {
      const uniqueBookIds = Array.from(
        new Set(conversationsList.map((c) => c.book_id)),
      );

      const bookResults = await Promise.all(
        uniqueBookIds.map(async (bookId) => {
          const book = await getBook(bookId);
          return { bookId, book };
        }),
      );

      const nextBooksById: Record<number, Book | null> = {};
      bookResults.forEach(({ bookId, book }) => {
        nextBooksById[bookId] = book;
      });
      setBooksById(nextBooksById);

      const ownerIds = bookResults
        .map(({ book }) => book?.user_id)
        .filter((id): id is number => typeof id === 'number');

      const borrowerIds = conversationsList.map((c) => c.borrower_id);

      const uniqueUserIds = Array.from(new Set([...ownerIds, ...borrowerIds]));

      const userResults = await Promise.all(
        uniqueUserIds.map(async (userId) => {
          const user = await getUserById(userId);
          return { userId, user };
        }),
      );

      const nextUsersById: Record<number, User | null> = {};
      userResults.forEach(({ userId, user }) => {
        nextUsersById[userId] = user;
      });
      setUsersById(nextUsersById);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    loadConversations();
  }, [userId]);

  useEffect(() => {
    if (selectedConversationId === null) {
      setMessages([]);
      return;
    }

    loadMessages(selectedConversationId);
  }, [selectedConversationId]);

  const currentUserId = useAuth().userId;

  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => {
      const lastMessageA = lastMessages[a.id];
      const lastMessageB = lastMessages[b.id];

      const lastActivityA =
        lastMessageA?.created_at ?? a.created_at ?? '1970-01-01T00:00:00Z';
      const lastActivityB =
        lastMessageB?.created_at ?? b.created_at ?? '1970-01-01T00:00:00Z';

      return (
        new Date(lastActivityB).getTime() - new Date(lastActivityA).getTime()
      );
    });
  }, [conversations, lastMessages]);

  if (!currentUserId) return;

  return (
    <>
      <Typography sx={{ fontSize: '24px', marginBottom: 2 }}>
        Ma messagerie
      </Typography>

      {isMobile ? (
        <Stack
          sx={{
            border: '1px solid #000',
            borderRadius: '15px',
            minHeight: '400px',
            overflow: 'hidden',
          }}
        >
          {selectedConversationId === null ? (
            <ConversationList
              conversations={sortedConversations}
              lastMessages={lastMessages}
              booksById={booksById}
              usersById={usersById}
              currentUserId={currentUserId}
              onSelectConversation={setSelectedConversationId}
              selectedConversationId={selectedConversationId}
              isMobile={isMobile}
            />
          ) : (
            <Stack sx={{ width: '100%' }}>
              <Button
                variant='text'
                color='inherit'
                onClick={() => setSelectedConversationId(null)}
                sx={{ alignSelf: 'flex-start', m: 1 }}
              >
                {'← Messagerie'}
              </Button>
              <ConversationContent
                messages={messages}
                currentUserId={currentUserId}
                selectedConversationId={selectedConversationId}
                loadMessages={loadMessages}
              />
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack>
          <Stack
            direction='row'
            width='100%'
            sx={{
              border: '1px solid #000',
              borderRadius: '15px',
              minHeight: '400px',
              overflow: 'hidden',
            }}
          >
            <Stack width='35%'>
              <ConversationList
                conversations={sortedConversations}
                lastMessages={lastMessages}
                booksById={booksById}
                usersById={usersById}
                currentUserId={currentUserId}
                onSelectConversation={setSelectedConversationId}
                selectedConversationId={selectedConversationId}
                isMobile={isMobile}
              />
            </Stack>
            <Stack width='65%'>
              <ConversationContent
                messages={messages}
                currentUserId={currentUserId}
                selectedConversationId={selectedConversationId}
                loadMessages={loadMessages}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
=======
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConversations } from '@/lib/services/conversations';

type Conversation = {
  id: number;
  book_id: number;
  user_id: number;
  created_at: string;
};

const ConversationsPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    getConversations().then(setConversations);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Ma messagerie</h1>
      {conversations.length === 0 ? (
        <p>Aucune conversation pour le moment</p>
      ) : (
        <ul>
          {conversations.map((c) => (
            <li key={c.id}>
              <Link href={`/conversations/${c.id}`}>
                Conversation #{c.id} — Livre {c.book_id}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
>>>>>>> 9fd174d (feat(messages): display conversations and messages list)
  );
};

export default ConversationsPage;
