import { useState } from "react";
import { sendMessage } from "@/lib/services/conversations";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "@mui/material";

type MessageFormProps = {
  conversationId: number;
  onMessageSent: () => void;
};

const MessageForm = ({ conversationId, onMessageSent }: MessageFormProps) => {
  const [content, setContent] = useState("");
  const currentUserId = useAuth().userId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUserId) return;
    if (!content.trim()) return;

    await sendMessage(conversationId, currentUserId, content);

    setContent("");
    onMessageSent(); // recharge les messages
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.5rem",
        padding: "1rem",
        height: "70px",
      }}
    >
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Écrire un message…"
        style={{
          flex: 1,
          borderRadius: "25px",
          border: "1px solid",
          padding: "10px",
        }}
      />
      <Button type="submit" variant="outlined">
        Envoyer
      </Button>
    </form>
  );
};

export default MessageForm;
