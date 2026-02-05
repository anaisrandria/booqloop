'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConversations } from '@/lib/services/conversations';
import { Stack, Typography } from '@mui/material';

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
    <>
      <Stack>
        <Typography sx={{ fontSize: '24px', marginBottom: 2 }}>
          Ma messagerie
        </Typography>
        {conversations.length === 0 ? (
          <p>Aucune conversation pour le moment</p>
        ) : (
          <Stack
            sx={{
              border: '1px solid #000',
              borderRadius: '5px',
              backgroundColor: '#fff',
            }}
          >
            {conversations.map((c) => (
              <Stack
                sx={{
                  padding: 2,
                  borderBottom: '1px solid #000',
                }}
              >
                <Link href={`/conversations/${c.id}`}>
                  Conversation #{c.id} — Livre {c.book_id}
                </Link>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default ConversationsPage;
