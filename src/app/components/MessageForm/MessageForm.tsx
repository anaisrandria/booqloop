// src/components/messaging/MessageForm.tsx
import { useState } from 'react';
import { sendMessage } from '@/lib/services/conversations';

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
}
