// src/components/messaging/MessageForm.tsx
import { useState } from 'react';
import { sendMessage } from '@/lib/services/conversations';
<<<<<<< HEAD
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
=======

type Props = {
  conversationId: number;
  senderId: number;
  onMessageSent: () => void;
};

export default function MessageForm({
  conversationId,
  senderId,
  onMessageSent,
}: Props) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await sendMessage(conversationId, senderId, content);
>>>>>>> 9fd174d (feat(messages): display conversations and messages list)

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
<<<<<<< HEAD
};

export default MessageForm;
=======
}
>>>>>>> 9fd174d (feat(messages): display conversations and messages list)
