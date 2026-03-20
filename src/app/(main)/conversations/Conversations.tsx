'use client';
import { useEffect, useMemo, useReducer, useState } from 'react';
import {
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  getConversationsList,
  getMessagesList,
} from '@/lib/services/conversations';
import { Book } from '@/app/types';
import { getBook } from '@/lib/services/books/getBook';
import { getUserById, User } from '@/lib/services/users/users';
import { useAuth } from '../../../hooks/useAuth';
import { Conversation, Message } from './Conversations.types';
import ConversationList from './ConversationsList';
import ConversationContent from './ConversationContent';
import { useSearchParams } from 'next/navigation';

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

  const searchParams = useSearchParams();
  const conversationId = searchParams.get('conversationId');

  const loadConversations = async () => {
    try {
      const data = await getConversationsList();
      setConversations(data);
      if (conversationId) {
        setSelectedConversationId(Number(conversationId));
      }
      await loadLastMessages(data);
      await getConversationDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const loadLastMessages = async (conversationsList: Conversation[]) => {
    try {
      const results = await Promise.all(
        conversationsList.map(async (conversation) => {
          const data: Message[] = await getMessagesList(conversation.id);
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
      const booksMap: Record<number, Book | null> = {};
      const usersMap: Record<number, User | null> = {};

      for (const conversation of conversationsList) {
        if (!booksMap[conversation.book_id]) {
          const book = await getBook(conversation.book_id);
          booksMap[conversation.book_id] = book;

          if (book && !usersMap[book.user?.id]) {
            const user = await getUserById(book.user?.id);
            usersMap[book.user?.id] = user;
          }
        }

        if (!usersMap[conversation.borrower_id]) {
          const user = await getUserById(conversation.borrower_id);
          usersMap[conversation.borrower_id] = user;
        }
      }

      setBooksById(booksMap);
      setUsersById(usersMap);
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
    <Container maxWidth='md'>
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
    </Container>
  );
};

export default ConversationsPage;
