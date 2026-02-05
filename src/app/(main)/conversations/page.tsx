'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConversations } from '@/lib/services/conversations';

type Conversation = {
  id: number;
  book_id: number;
  user_id: number;
  created_at: string;
};

const ConversationsPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    getConversations().then(setConversations);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Ma messagerie</h1>
      {conversations.length === 0 ? (
        <p>Aucune conversation pour le moment</p>
      ) : (
        <ul>
          {conversations.map((c) => (
            <li key={c.id}>
              <Link href={`/conversations/${c.id}`}>
                Conversation #{c.id} — Livre {c.book_id}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationsPage;
