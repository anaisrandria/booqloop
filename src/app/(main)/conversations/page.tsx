'use client';
import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
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

  const loadConversations = async () => {
    try {
      const data: Conversation[] = await getConversations();
      setConversations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMessages = async (conversationId: number) => {
    try {
      const data: Message[] = await getMessages(conversationId);
      setMessages(data);
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

  return (
    <>
      <Typography sx={{ fontSize: '24px', marginBottom: 2 }}>
        Ma messagerie
      </Typography>
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
        <Stack
          width='35%'
          sx={{
            borderRight: '1px solid #000',
            maxHeight: '600px',
            overflowY: 'auto',
          }}
        >
          {conversations.length === 0 ? (
            <Typography sx={{ padding: 2 }}>
              Aucune conversation pour le moment
            </Typography>
          ) : (
            conversations.map((conversation) => {
              const isSelected = conversation.id === selectedConversationId;

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
                </Stack>
              );
            })
          )}
        </Stack>
        <Stack width='65%'>
          {selectedConversationId !== null && (
            <>
              <MessageList messages={messages} currentUserId={currentUserId} />
              <MessageForm
                conversationId={selectedConversationId}
                senderId={currentUserId}
                onMessageSent={() => {
                  if (selectedConversationId !== null) {
                    loadMessages(selectedConversationId);
                  }
                }}
              />
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default ConversationsPage;
