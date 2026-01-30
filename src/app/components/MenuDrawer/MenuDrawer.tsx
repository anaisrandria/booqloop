import { Button, Drawer, IconButton, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { MenuDrawerProps } from "./MenuDrawer.types";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const MenuDrawer = ({ isMenuOpen, toggleOpenMenu }: MenuDrawerProps) => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  return (
    <Drawer open={isMenuOpen} onClose={toggleOpenMenu(false)}>
      <Stack
        sx={{
          width: "100vw",
          height: "100%",
          backgroundColor: "#F7F2EC",
        }}
      >
        <Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              width: "100%",
              paddingTop: "1em",
              paddingRight: "1em",
            }}
          >
            <IconButton onClick={toggleOpenMenu(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Typography
            fontSize="20px"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontFamily: "Poppins",
            }}
          >
            {"booqloop"}
          </Typography>
        </Stack>
        <Stack
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: "2em",
          }}
        >
          {isLoggedIn ? (
            <>
              <Button
                variant="text"
                color="inherit"
                sx={{ fontFamily: "Poppins" }}
                onClick={() => {
                  router.push("/home");
                  toggleOpenMenu(false)();
                }}
              >
                {"Accueil"}
              </Button>
              <Button
                variant="text"
                color="inherit"
                sx={{ fontFamily: "Poppins" }}
              >
                {"Messagerie"}
              </Button>
              <Button
                variant="text"
                color="inherit"
                sx={{ fontFamily: "Poppins" }}
                onClick={() => {
                  router.push("/add-book");
                  toggleOpenMenu(false)();
                }}
              >
                {"Ma bibliothèque"}
              </Button>
              <Button
                variant="text"
                color="inherit"
                sx={{ fontFamily: "Poppins" }}
                onClick={() => {
                  logout();
                  toggleOpenMenu(false)();
                }}
              >
                {"Déconnexion"}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="text"
                color="inherit"
                sx={{ fontFamily: "Poppins" }}
                onClick={() => {
                  router.push("/login");
                  toggleOpenMenu(false)();
                }}
              >
                {"Se connecter"}
              </Button>
              <Button
                variant="text"
                color="inherit"
                sx={{ fontFamily: "Poppins" }}
                onClick={() => {
                  router.push("/register");
                  toggleOpenMenu(false)();
                }}
              >
                {"S'inscrire"}
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default MenuDrawer;
