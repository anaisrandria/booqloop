import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

type Message = {
  id: number;
  content: string;
  sender_id: number;
  created_at: string;
};

type Props = {
  messages?: Message[];
  currentUserId: number | null; // Accept null if user is not logged in
};

const MessageList = ({ messages, currentUserId }: Props) => {
  return (
    <Stack
      sx={{
        padding: '1rem',
        overflow: 'auto',
        height: '60vh',
      }}
    >
      {messages?.map((message) => (
        <div
          key={message.id}
          style={{
            marginBottom: '0.5rem',
            textAlign:
              message.sender_id === Number(currentUserId) ? 'right' : 'left',
          }}
        >
          <span
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              background:
                message.sender_id === Number(currentUserId)
                  ? '#1976d2'
                  : '#e0e0e0',
              color:
                message.sender_id === Number(currentUserId) ? 'white' : 'black',
              display: 'inline-block',
            }}
          >
            {message.content}
          </span>
        </div>
      ))}
    </Stack>
  );
};

export default MessageList;
