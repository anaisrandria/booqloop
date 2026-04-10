import { Stack } from '@mui/material';

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
        flex: 1,
      }}
    >
      {messages?.map((message) => {
        const isCurrentUserSender = message.sender_id === Number(currentUserId);
        return (
          <Stack
            key={message.id}
            style={{
              marginBottom: '0.5rem',
              alignItems: isCurrentUserSender ? 'flex-end' : 'flex-start',
            }}
          >
            <span
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                background: isCurrentUserSender ? '#1976d2' : '#e0e0e0',
                color: isCurrentUserSender ? 'white' : 'black',
                display: 'inline-block',
                maxWidth: '75%',
                wordBreak: 'break-word',
              }}
            >
              {message.content}
            </span>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default MessageList;
