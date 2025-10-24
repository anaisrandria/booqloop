import { useAuth } from "@/hooks/useAuth";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const NavigationMenu = () => {
  const { logout } = useAuth();
  const [profileMenu, setProfileMenu] = useState<null | HTMLElement>(null);
  const open = Boolean(profileMenu);

  const handleCloseProfile = () => {
    setProfileMenu(null);
  };

  return (
    <>
      <Button variant="text" color="inherit" sx={{ textTransform: "none" }}>
        {"Accueil"}
      </Button>
      <Button variant="text" color="inherit" sx={{ textTransform: "none" }}>
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
  );
};

export default NavigationMenu;
