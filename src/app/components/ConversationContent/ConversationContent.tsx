import { Stack, Typography } from '@mui/material';
import MessageForm from '../MessageForm/MessageForm';
import MessageList from '../MessageList/MessageList';
import { Message } from '../../(main)/conversations/Conversations.types';

type ConversationContentProps = {
  messages: Message[];
  currentUserId: number;
  selectedConversationId: number | null;
  loadMessages: (conversationId: number) => void;
};
const ConversationContent = ({
  messages,
  currentUserId,
  selectedConversationId,
  loadMessages,
}: ConversationContentProps) => {
  return selectedConversationId ? (
    <Stack sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack sx={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <MessageList messages={messages} currentUserId={currentUserId} />
      </Stack>
      <MessageForm
        conversationId={selectedConversationId}
        onMessageSent={() => {
          if (selectedConversationId !== null) {
            loadMessages(selectedConversationId);
          }
        }}
      />
    </Stack>
  ) : (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography>Retrouvez ici toutes vos demandes de prêt</Typography>
    </Stack>
  );
};

export default ConversationContent;
