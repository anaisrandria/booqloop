import { User } from '../../../lib/services/users/users';
import { Book } from '../../types';

export type Message = {
  id: number;
  content: string;
  sender_id: number;
  created_at: string;
};

export type Conversation = {
  id: number;
  book_id: number;
  borrower_id: number;
  owner_id: number;
  created_at: string;
};

export type ConversationListProps = {
  conversations: Conversation[];
  lastMessages: Record<number, Message | null>;
  booksById: Record<number, Book | null>;
  usersById: Record<number, User | null>;
  currentUserId: number;
  selectedConversationId?: number | null;
  onSelectConversation: (id: number) => void;
  isMobile: boolean;
};
