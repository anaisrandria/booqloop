<<<<<<< HEAD
import { Button, Stack } from '@mui/material';
import { ContactButtonsProps } from './ContactButtons.types';
import { createConversation } from '../../../lib/services/conversations';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';

const ContactButtons = ({ isMobile, bookId }: ContactButtonsProps) => {
  const router = useRouter();
  const { userId } = useAuth();
  const handleReservation = async () => {
    if (!userId) return;
    try {
      const response = await createConversation(userId, bookId);
      // redirection seulement si succès
      router.push(`/conversations?conversationId=${response.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      direction={isMobile ? 'row' : 'column'}
      gap={2}
      paddingX={isMobile ? 3 : 0}
      sx={{
        position: isMobile ? 'fixed' : 'relative',
        bottom: isMobile ? 0 : 'auto',
        left: isMobile ? 0 : 'auto',
        height: isMobile ? '8vh' : 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f7f2ec',
      }}
    >
      <Button
        variant='contained'
        color='primary'
        sx={{
          backgroundColor: 'black',
          textTransform: 'none',
          borderRadius: '10px',
          width: '100%',
          flex: 1,
        }}
        onClick={handleReservation}
=======
import { Button, Stack } from "@mui/material";
import { ContactButtonsProps } from "./ContactButtons.types";

const ContactButtons = ({ isMobile }: ContactButtonsProps) => {
  return (
    <Stack
      direction={isMobile ? "row" : "column"}
      gap={2}
      paddingX={isMobile ? 3 : 0}
      sx={{
        position: isMobile ? "fixed" : "relative",
        bottom: isMobile ? 0 : "auto",
        left: isMobile ? 0 : "auto",
        height: isMobile ? "8vh" : "auto",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#f7f2ec",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "black",
          textTransform: "none",
          borderRadius: "10px",
          width: "100%",
          flex: 1,
        }}
      >
        Message
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "black",
          textTransform: "none",
          borderRadius: "10px",
          width: "100%",
          flex: 1,
        }}
>>>>>>> main
      >
        Réserver
      </Button>
    </Stack>
  );
};

export default ContactButtons;
