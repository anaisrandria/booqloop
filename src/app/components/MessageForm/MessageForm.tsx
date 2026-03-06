// src/components/messaging/MessageForm.tsx
import { useState } from 'react';
import { sendMessage } from '@/lib/services/conversations';
import { useAuth } from '../../../hooks/useAuth';

type MessageFormProps = {
  conversationId: number;
  onMessageSent: () => void;
};

const MessageForm = ({ conversationId, onMessageSent }: MessageFormProps) => {
  const [content, setContent] = useState('');
  const currentUserId = useAuth().userId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUserId) return;
    if (!content.trim()) return;

    await sendMessage(conversationId, currentUserId, content);

    setContent('');
    onMessageSent(); // recharge les messages
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '0.5rem', padding: '1rem' }}
    >
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Écrire un message…'
        style={{ flex: 1 }}
      />
      <button type='submit'>Envoyer</button>
    </form>
  );
};

export default MessageForm;
