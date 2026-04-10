'use client';
import {
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ConversationList from '../../components/ConversationsList/ConversationsList';
import ConversationContent from '../../components/ConversationContent/ConversationContent';
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
          sx={{
            width: '100%',
            height: '70vh',
          }}
        >
          {/* Liste des conversations — masquée sur mobile quand une conv est ouverte */}
          {(!isMobile || selectedConversationId === null) && (
            <Stack
              sx={{
                width: isMobile ? '100%' : '35%',
                height: '100%',
              }}
            >
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
            <Stack
              direction='column'
              sx={{
                width: isMobile ? '100%' : '65%',
                height: '100%',
              }}
            >
              {/* Bouton retour affiché uniquement sur mobile */}
              {isMobile && selectedConversationId !== null && (
                <Button
                  variant='text'
                  color='inherit'
                  onClick={() => setSelectedConversationId(null)}
                  sx={{ alignSelf: 'flex-start', flexShrink: 0, m: 1 }}
                >
                  ← Messagerie
                </Button>
              )}
              <Stack sx={{ flex: 1, minHeight: 0 }}>
                <ConversationContent
                  messages={messages}
                  currentUserId={currentUserId}
                  selectedConversationId={selectedConversationId}
                  loadMessages={loadMessages}
                />
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default ConversationsPage;
