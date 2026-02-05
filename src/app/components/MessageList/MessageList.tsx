<<<<<<< HEAD
import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

=======
>>>>>>> 9fd174d (feat(messages): display conversations and messages list)
type Message = {
  id: number;
  content: string;
  sender_id: number;
  created_at: string;
};

type Props = {
<<<<<<< HEAD
  messages?: Message[];
  currentUserId: number | null; // Accept null if user is not logged in
};

const MessageList = ({ messages, currentUserId }: Props) => {
  console.log('🔵 currentUserId:', currentUserId);

  return (
    <Stack
      sx={{
        padding: '1rem',
        overflow: 'auto',
        height: '60vh',
      }}
    >
      {messages?.map((message) => (
=======
  messages: Message[];
  currentUserId: number;
};

export default function MessageList({ messages, currentUserId }: Props) {
  return (
    <div style={{ padding: '1rem' }}>
      {messages.map((message) => (
>>>>>>> 9fd174d (feat(messages): display conversations and messages list)
        <div
          key={message.id}
          style={{
            marginBottom: '0.5rem',
            textAlign: message.sender_id === currentUserId ? 'right' : 'left',
          }}
        >
          <span
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              background:
                message.sender_id === currentUserId ? '#1976d2' : '#e0e0e0',
              color: message.sender_id === currentUserId ? 'white' : 'black',
              display: 'inline-block',
            }}
          >
            {message.content}
          </span>
        </div>
      ))}
<<<<<<< HEAD
    </Stack>
  );
};

export default MessageList;
=======
    </div>
  );
}
>>>>>>> 9fd174d (feat(messages): display conversations and messages list)
