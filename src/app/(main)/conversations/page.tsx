'use client';
import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MessageList from '../../components/MessageList/MessageList';
import MessageForm from '@/app/components/MessageForm/MessageForm';
import { getConversations, getMessages } from '@/lib/services/conversations';
import { Book } from '@/app/types';
import { getBook } from '@/lib/services/books/getBook';
import { getUserById, User } from '@/lib/services/users/getUserById';
import { useAuth } from '../../../hooks/useAuth';

type Message = {
  id: number;
  content: string;
  sender_id: number;
  created_at: string;
};

type Conversation = {
  id: number;
  book_id: number;
  borrower_id: number;
  owner_id: number;
  created_at: string;
};

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
      const data = await getConversations();
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

  const formatLastMessageDate = (iso: string) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

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

  const renderConversationList = () => {
    return (
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          maxHeight: '600px',
          overflowY: 'auto',
          borderRight: isMobile ? 'none' : '1px solid #000',
        }}
      >
        {sortedConversations.length === 0 ? (
          <Typography sx={{ padding: 2 }}>
            Aucune conversation pour le moment
          </Typography>
        ) : (
          sortedConversations.map((conversation) => {
            const isSelected = conversation.id === selectedConversationId;
            const lastMessage = lastMessages[conversation.id];
            const book = booksById[conversation.book_id];

            const interlocutorId =
              book && book.user_id === currentUserId
                ? conversation.borrower_id
                : (book?.user_id ?? conversation.borrower_id);
            const interlocutor = usersById[interlocutorId];

            const lastActivityDate =
              lastMessage?.created_at ?? conversation.created_at;

            return (
              <Stack
                key={conversation.id}
                onClick={() => setSelectedConversationId(conversation.id)}
                sx={{
                  padding: 2,
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#E0E7FF' : 'transparent',
                  '&:hover': {
                    backgroundColor: isSelected ? '#C7D2FE' : '#F3F4F6',
                  },
                }}
              >
                <Stack direction='row' spacing={1.5} alignItems='center'>
                  {book?.image_url ? (
                    <Box
                      component='img'
                      src={book.image_url}
                      alt={`Couverture de ${book.title}`}
                      sx={{
                        width: 44,
                        height: 64,
                        objectFit: 'cover',
                        borderRadius: 1,
                        flexShrink: 0,
                        backgroundColor: '#E5E7EB',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 44,
                        height: 64,
                        borderRadius: 1,
                        flexShrink: 0,
                        backgroundColor: '#E5E7EB',
                      }}
                    />
                  )}
                  <Stack sx={{ minWidth: 0, flex: 1 }}>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='baseline'
                      spacing={1}
                    >
                      <Typography fontWeight={600} noWrap sx={{ minWidth: 0 }}>
                        {book?.title}, {book?.author}
                      </Typography>
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        noWrap
                      >
                        {formatLastMessageDate(lastActivityDate)}
                      </Typography>
                    </Stack>
                    <Typography variant='body2' color='text.secondary' noWrap>
                      {interlocutor?.username}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      noWrap
                      sx={{ mt: 0.5 }}
                    >
                      {lastMessage
                        ? lastMessage.content
                        : 'Aucun message pour le moment'}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            );
          })
        )}
      </Stack>
    );
  };

  const renderConversationContent = () =>
    selectedConversationId !== null && (
      <Stack sx={{ width: '100%' }}>
        <MessageList messages={messages} currentUserId={currentUserId} />
        <MessageForm
          conversationId={selectedConversationId}
          onMessageSent={() => {
            if (selectedConversationId !== null) {
              loadMessages(selectedConversationId);
            }
          }}
        />
      </Stack>
    );

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
            renderConversationList()
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
              {renderConversationContent()}
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
            <Stack width='35%'>{renderConversationList()}</Stack>
            <Stack width='65%'>{renderConversationContent()}</Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default ConversationsPage;
