import { useAuth } from "@/hooks/useAuth";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NavigationMenu = () => {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <>
      <Button
        variant="text"
        color="inherit"
        sx={{ textTransform: "none" }}
        onClick={() => router.push("/home")}
      >
        {"Accueil"}
      </Button>
      <Button
        variant="text"
        color="inherit"
        sx={{ textTransform: "none" }}
        onClick={() => router.push("/conversations")}
      >
        {"Messagerie"}
      </Button>
      <Button
        variant="text"
        color="inherit"
        sx={{ textTransform: "none" }}
        onClick={() => router.push("/profile")}
      >
        {"Ma bibliothèque"}
      </Button>
      <Button
        variant="text"
        color="inherit"
        sx={{ textTransform: "none" }}
        onClick={() => {
          logout();
          router.push("/");
        }}
      >
        {"Déconnexion"}
      </Button>
    </>
  );
};

export default NavigationMenu;
