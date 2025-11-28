import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const AuthMenu = () => {
  const router = useRouter();

  return (
    <>
      <Button
        variant="text"
        color="inherit"
        sx={{ textTransform: "none" }}
        onClick={() => router.push("/login")}
      >
        {"Se connecter"}
      </Button>
      <Button
        variant="text"
        color="inherit"
        sx={{ textTransform: "none" }}
        onClick={() => router.push("/register")}
      >
        {"S'inscrire"}
      </Button>
    </>
  );
};

export default AuthMenu;
