import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Conversation } from '../../(main)/conversations/Conversations.types';

import { ConversationListProps } from '../../(main)/conversations/Conversations.types';
import { formatLastMessageDate } from '../../utils/formatDate';
import { useRouter } from 'next/navigation';
import { Delete } from '@mui/icons-material';
import { deleteConversation } from '../../../lib/services/conversations';

const ConversationList = ({
  conversations,
  setConversations,
  lastMessages,
  booksById,
  usersById,
  currentUserId,
  selectedConversationId,
  onSelectConversation,
  isMobile,
}: ConversationListProps) => {
  const handleDelete = async (conversationId: number) => {
    try {
      await deleteConversation(conversationId);

      setConversations((prev) =>
        prev.filter((conv) => conv.id !== conversationId),
      );
      if (selectedConversationId === conversationId) {
        onSelectConversation(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const router = useRouter();
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
                <Box
                  component='img'
                  src={book?.image_url}
                  alt={book?.title}
                  sx={{
                    width: 44,
                    height: 64,
                    objectFit: 'cover',
                    borderRadius: 1,
                    flexShrink: 0,
                    backgroundColor: '#E5E7EB',
                  }}
                  onClick={() => router.push(`/books/${book?.id}`)}
                />
                <Stack sx={{ minWidth: 0, flex: 1 }}>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='baseline'
                    spacing={1}
                  >
                    <Typography
                      sx={{ fontSize: '14px', minWidth: '0px' }}
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
                    <IconButton onClick={() => handleDelete(conversation.id)}>
                      <Delete sx={{ fontSize: '15px' }} />
                    </IconButton>
                  </Stack>
                  <Typography sx={{ fontSize: '14px' }}>
                    {interlocutor?.username}
                  </Typography>
                  <Typography
                    sx={{ color: 'text.secondary', fontSize: '14px' }}
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
