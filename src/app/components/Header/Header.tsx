"use client";

import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";
import { MenuDrawer } from "../MenuDrawer";
import { useAuth } from "@/hooks/useAuth";
import { NavigationMenu } from "../NavigationMenu";
import { AuthMenu } from "../AuthMenu";
import { HomeLogo } from "../HomeLogo";

const Header = () => {
  const { isLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
      <HomeLogo />
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
        {isLoggedIn ? <NavigationMenu /> : <AuthMenu />}
      </Stack>
      <MenuDrawer
        isMenuOpen={isMenuOpen}
        toggleOpenMenu={() => toggleOpenMenu(false)}
      />
    </Stack>
  );
};

export default Header;
