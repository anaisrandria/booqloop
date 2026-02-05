'use client';
import { useEffect, useState } from 'react';
import MessageList from '@/app/components/MessageList/MessageList';
import MessageForm from '@/app/components/MessageForm/MessageForm';
import { getMessages, sendMessage } from '@/lib/services/conversations';

type Message = {
  id: number;
  content: string;
  sender_id: number;
  created_at: string;
};

export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const conversationId = Number(params.id);
  const currentUserId = 1; // for testing
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = async () => {
    const data = await getMessages(conversationId);
    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, [conversationId]);

  return (
    <div>
      <MessageList messages={messages} currentUserId={currentUserId} />
      <MessageForm
        conversationId={conversationId}
        senderId={currentUserId}
        onMessageSent={loadMessages}
      />
    </div>
  );
}
