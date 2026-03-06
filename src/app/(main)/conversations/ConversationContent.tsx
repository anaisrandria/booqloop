import { Stack } from '@mui/material';
import MessageForm from '../../components/MessageForm/MessageForm';
import MessageList from '../../components/MessageList/MessageList';
import { Message } from './Conversations.types';

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
  if (selectedConversationId === null) return;
  return (
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
};

export default ConversationContent;
