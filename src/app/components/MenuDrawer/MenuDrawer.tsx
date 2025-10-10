import { Button, Drawer, IconButton, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { MenuDrawerProps } from './MenuDrawer.types';

const MenuDrawer = ({ isMenuOpen, toggleOpenMenu }: MenuDrawerProps) => {
  return (
    <Drawer open={isMenuOpen} onClose={toggleOpenMenu(false)}>
      <Stack
        sx={{
          width: '100vw',
          height: '100%',
          backgroundColor: '#F7F2EC',
        }}
      >
        <Stack>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='flex-end'
            sx={{
              width: '100%',
              paddingTop: '1em',
              paddingRight: '1em',
            }}
          >
            <IconButton onClick={toggleOpenMenu(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Typography
            fontSize='20px'
            sx={{
              flexGrow: 1,
              textAlign: 'center',
            }}
          >
            booqloop
          </Typography>
        </Stack>
        <Stack
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2em',
          }}
        >
          <Button variant='text' color='inherit'>
            Accueil
          </Button>
          <Button variant='text' color='inherit'>
            Messagerie
          </Button>
          <Button variant='text' color='inherit'>
            Profil
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default MenuDrawer;
