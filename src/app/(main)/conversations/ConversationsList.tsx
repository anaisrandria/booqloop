import { Box, Stack, Typography } from '@mui/material';
import { Conversation } from './Conversations.types';

import { ConversationListProps } from './Conversations.types';
import { formatLastMessageDate } from '../../utils/formatDate';

const ConversationList = ({
  conversations,
  lastMessages,
  booksById,
  usersById,
  currentUserId,
  selectedConversationId,
  onSelectConversation,
  isMobile,
}: ConversationListProps) => {
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
      {conversations.length === 0 ? (
        <Typography sx={{ padding: 2 }}>
          Aucune conversation pour le moment
        </Typography>
      ) : (
        conversations.map((conversation: Conversation) => {
          const lastMessage = lastMessages[conversation.id];
          const book = booksById[conversation.book_id];

          const interlocutorId =
            book && book.user.id === currentUserId
              ? conversation.borrower_id
              : (book?.user.id ?? conversation.borrower_id);
          const interlocutor = usersById[interlocutorId];

          const lastActivityDate =
            lastMessage?.created_at ?? conversation.created_at;

          return (
            <Stack
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              sx={{
                padding: 2,
                cursor: 'pointer',
                backgroundColor:
                  selectedConversationId === conversation.id
                    ? '#E5E7EB'
                    : 'transparent',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
              }}
            >
              <Stack direction='row' spacing={1.5} alignItems='center'>
                {book?.image_url ? (
                  <Box
                    component='img'
                    src={book.image_url}
                    alt={book.title}
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
                    <Typography
                      sx={{
                        fontSize: '14px',
                        minWidth: '0px',
                      }}
                      noWrap
                    >
                      <span style={{ fontWeight: 'bold' }}>{book?.title}</span>,{' '}
                      {book?.author}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontSize: '13px',
                        overflow: 'visible',
                      }}
                      noWrap
                    >
                      {formatLastMessageDate(lastActivityDate)}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: '14px',
                    }}
                  >
                    {interlocutor?.username}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: '14px',
                    }}
                    noWrap
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

export default ConversationList;
