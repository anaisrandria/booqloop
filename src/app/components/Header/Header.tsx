'use client';

import {
  Button,
  Drawer,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useState } from 'react';
import { MenuDrawer } from '../MenuDrawer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleOpenMenu = (newState: boolean) => () => {
    setIsMenuOpen(newState);
  };

  return (
    <Stack
      direction='row'
      sx={{
        width: '100%',
        height: '2em',
        marginBottom: '3em',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
      >
        booqloop
      </Stack>
      <TextField
        placeholder='Rechercher un livre'
        sx={{
          width: {
            xs: '100%',
            sm: '50vw',
          },
          marginRight: '1.5em',
        }}
        variant='standard'
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
      >
        <IconButton onClick={toggleOpenMenu(true)} sx={{ padding: 0 }}>
          <MenuRoundedIcon />
        </IconButton>
      </Stack>
      <Stack
        direction='row'
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
          whiteSpace: 'nowrap',
        }}
      >
        <Button variant='text' color='inherit' sx={{ textTransform: 'none' }}>
          Accueil
        </Button>
        <Button variant='text' color='inherit' sx={{ textTransform: 'none' }}>
          Messagerie
        </Button>
        <Button variant='text' color='inherit' sx={{ textTransform: 'none' }}>
          Profil
        </Button>
      </Stack>
      <MenuDrawer
        isMenuOpen={isMenuOpen}
        toggleOpenMenu={() => toggleOpenMenu(false)}
      />
    </Stack>
  );
};

export default Header;
