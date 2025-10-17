"use client";

import {
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";
import { MenuDrawer } from "../MenuDrawer";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [profileMenu, setProfileMenu] = useState<null | HTMLElement>(null);
  const open = Boolean(profileMenu);

  const handleCloseProfile = () => {
    setProfileMenu(null);
  };

  const toggleOpenMenu = (newState: boolean) => () => {
    setIsMenuOpen(newState);
  };

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        height: "2em",
        marginBottom: "3em",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        booqloop
      </Stack>
      <TextField
        placeholder="Rechercher un livre"
        sx={{
          width: {
            xs: "100%",
            sm: "50vw",
          },
          marginRight: "1.5em",
        }}
        variant="standard"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <IconButton onClick={toggleOpenMenu(true)} sx={{ padding: 0 }}>
          <MenuRoundedIcon />
        </IconButton>
      </Stack>
      <Stack
        direction="row"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          whiteSpace: "nowrap",
        }}
      >
        {isLoggedIn ? (
          <>
            <Button
              variant="text"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              {"Accueil"}
            </Button>
            <Button
              variant="text"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              {"Messagerie"}
            </Button>
            <Button
              variant="text"
              color="inherit"
              sx={{ textTransform: "none" }}
              id="profile-button"
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => setProfileMenu(e.currentTarget)}
            >
              {"Profil"}
            </Button>
            <Menu
              id="profile-menu"
              anchorEl={profileMenu}
              open={open}
              onClose={handleCloseProfile}
              slotProps={{
                list: {
                  "aria-labelledby": "profile-button",
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                "& .MuiMenuItem-root": {
                  fontSize: "14px",
                  fontFamily: "Poppins",
                },
              }}
            >
              <MenuItem>{"Ma bibliothèque"}</MenuItem>
              <MenuItem onClick={logout}>{"Déconnexion"}</MenuItem>
            </Menu>
          </>
        ) : (
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
        )}
      </Stack>
      <MenuDrawer
        isMenuOpen={isMenuOpen}
        toggleOpenMenu={() => toggleOpenMenu(false)}
      />
    </Stack>
  );
};

export default Header;
