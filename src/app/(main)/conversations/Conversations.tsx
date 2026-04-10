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
import { useConversations } from './useConversations';

const ConversationsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    messages,
    lastMessages,
    booksById,
    usersById,
    sortedConversations,
    selectedConversationId,
    setSelectedConversationId,
    setConversations,
    loadMessages,
    currentUserId,
  } = useConversations();

  if (!currentUserId) return;

  return (
    <Container maxWidth='md'>
      <Typography sx={{ fontSize: '24px', marginBottom: 2 }}>
        Ma messagerie
      </Typography>

      <Stack
        sx={{
          border: '1px solid #000',
          borderRadius: '15px',
          minHeight: '400px',
          overflow: 'hidden',
        }}
      >
        <Stack
          direction={isMobile ? 'column' : 'row'}
          width='100%'
          height='100%'
        >
          {/* Liste des conversations — masquée sur mobile quand une conv est ouverte */}
          {(!isMobile || selectedConversationId === null) && (
            <Stack width={isMobile ? '100%' : '35%'}>
              <ConversationList
                conversations={sortedConversations}
                setConversations={setConversations}
                lastMessages={lastMessages}
                booksById={booksById}
                usersById={usersById}
                currentUserId={currentUserId}
                onSelectConversation={setSelectedConversationId}
                selectedConversationId={selectedConversationId}
                isMobile={isMobile}
              />
            </Stack>
          )}

          {/* Contenu de la conversation sélectionnée */}
          {(!isMobile || selectedConversationId !== null) && (
            <Stack width={isMobile ? '100%' : '65%'}>
              {/* Bouton retour affiché uniquement sur mobile */}
              {isMobile && selectedConversationId !== null && (
                <Button
                  variant='text'
                  color='inherit'
                  onClick={() => setSelectedConversationId(null)}
                  sx={{ alignSelf: 'flex-start', m: 1 }}
                >
                  ← Messagerie
                </Button>
              )}
              <ConversationContent
                messages={messages}
                currentUserId={currentUserId}
                selectedConversationId={selectedConversationId}
                loadMessages={loadMessages}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default ConversationsPage;
