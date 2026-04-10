import { Button, Stack } from "@mui/material";
import { ContactButtonsProps } from "./ContactButtons.types";
import {
  createConversation,
  sendMessage,
} from "../../../lib/services/conversations";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { deleteBook } from "@/lib/services/books/deleteBook";

const ContactButtons = ({
  isMobile,
  bookId,
  bookOwnerId,
}: ContactButtonsProps) => {
  const router = useRouter();
  const { isLoggedIn, userId } = useAuth();
  const isBookOwner = isLoggedIn && userId === bookOwnerId;

  const handleReservation = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }
    try {
      const response = await createConversation(userId, bookId);
      // redirection seulement si succès
      if (!isLoggedIn) {
        router.push("");
      }
      router.push(`/conversations?conversationId=${response.id}`);

      await sendMessage(
        response.id,
        "Bonjour ! Je souhaite emprunter ce livre. Est-il disponible ?",
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBook(bookId);
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

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
      {isBookOwner ? (
        <>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              width: "100%",
              flex: 1,
            }}
            onClick={() => router.push(`/profile/edit-book/${bookId}`)}
          >
            {"Modifier"}
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              textTransform: "none",
              borderRadius: "10px",
              width: "100%",
              flex: 1,
            }}
            onClick={handleDelete}
          >
            {"Supprimer"}
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            textTransform: "none",
            borderRadius: "10px",
            width: "100%",
            flex: 1,
          }}
          onClick={handleReservation}
        >
          {isLoggedIn ? "Réserver" : "Se connecter"}
        </Button>
      )}
      {!isLoggedIn && (
        <Button
          variant="outlined"
          color="primary"
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            width: "100%",
            flex: 1,
          }}
          onClick={() => {
            router.push("/register");
          }}
        >
          {"Créer un compte"}
        </Button>
      )}
    </Stack>
  );
};

export default ContactButtons;
