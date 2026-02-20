"use client";

import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { MenuDrawer } from "../MenuDrawer";
import { useAuth } from "@/hooks/useAuth";
import { NavigationMenu } from "../NavigationMenu";
import { AuthMenu } from "../AuthMenu";
import { HomeLogo } from "../HomeLogo";
import { useSearch } from "@/hooks/useSearch";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState(searchQuery ?? "");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleOpenMenu = (newState: boolean) => () => {
    setIsMenuOpen(newState);
  };

  // Mise à jour instantanée de la recherche uniquement sur la page home
  useEffect(() => {
    if (pathname !== "/home") return;

    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 100);

    // Annulation du timeout précédent si inputValue change rapidement
    return () => clearTimeout(handler);
  }, [inputValue, pathname, setSearchQuery]);

  // Sinon, mise à jour de la recherche et redirection à l'appui sur Entrée
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (pathname !== "/home" && e.key === "Enter") {
      setSearchQuery(inputValue);
      router.push("/home");
    }
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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleSearchKeyDown}
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
                {inputValue && (
                  <IconButton
                    size="small"
                    onClick={() => setInputValue("")}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
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
