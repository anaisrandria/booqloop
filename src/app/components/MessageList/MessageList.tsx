type Message = {
  id: number;
  content: string;
  sender_id: number;
  created_at: string;
};

type Props = {
  messages: Message[];
  currentUserId: number;
};

export default function MessageList({ messages, currentUserId }: Props) {
  return (
    <div style={{ padding: '1rem' }}>
      {messages.map((message) => (
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
    </div>
  );
}
