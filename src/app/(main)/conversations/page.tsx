'use client';
import { useEffect, useState } from 'react';
import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MessageList from '../../components/MessageList/MessageList';
import MessageForm from '@/app/components/MessageForm/MessageForm';
import { getConversations, getMessages } from '@/lib/services/conversations';

type Message = {
  id: number;
  content: string;
  sender_id: number;
  created_at: string;
};

type Conversation = {
  id: number;
  book_id: number;
  user_id: number;
  created_at: string;
};

const ConversationsPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessages, setLastMessages] = useState<
    Record<number, Message | null>
  >({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const loadConversations = async () => {
    try {
      const data: Conversation[] = await getConversations();
      setConversations(data);
      loadLastMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMessages = async (conversationId: number) => {
    try {
      const data: Message[] = await getMessages(conversationId);
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

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversationId === null) {
      setMessages([]);
      return;
    }

    loadMessages(selectedConversationId);
  }, [selectedConversationId]);

  const currentUserId = 1; // TODO: remplacer par l'utilisateur connecté

  const renderConversationList = () => (
    <Stack
      sx={{
        width: '100%',
        maxHeight: '600px',
        overflowY: 'auto',
        borderRight: isMobile ? 'none' : '1px solid #000',
      }}
    >
      {conversations.length === 0 ? (
        <Typography sx={{ padding: 2 }}>
          Aucune conversation pour le moment
        </Typography>
      ) : (
        conversations.map((conversation) => {
          const isSelected = conversation.id === selectedConversationId;
          const lastMessage = lastMessages[conversation.id];

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
              <Typography fontWeight={600}>
                Conversation #{conversation.id}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Livre {conversation.book_id}
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
          );
        })
      )}
    </Stack>
  );

  const renderConversationContent = () =>
    selectedConversationId !== null && (
      <Stack sx={{ width: '100%' }}>
        <MessageList
          messages={messages}
          currentUserId={currentUserId}
          showBackButton={false}
        />
        <MessageForm
          conversationId={selectedConversationId}
          senderId={currentUserId}
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
                {'← Retour aux conversations'}
              </Button>
              {renderConversationContent()}
            </Stack>
          )}
        </Stack>
      ) : (
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
      )}
    </>
  );
};

export default ConversationsPage;
