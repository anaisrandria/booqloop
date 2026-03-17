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

          console.log('book:', book);
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
                    <Typography variant='caption' color='text.secondary' noWrap>
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

export default ConversationList;
