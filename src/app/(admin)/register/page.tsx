'use client';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth='sm'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
          paddingBottom: 6,
        }}
      >
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
          }}
        >
          booqloop
        </Stack>
        <Stack
          spacing={5}
          sx={{
            width: {
              xs: '75%',
              sm: '60%',
            },
          }}
        >
          <Stack spacing={1}>
            <TextField
              label="Nom d'utilisateur"
              variant='standard'
              type='search'
            />
            <TextField label='Email' variant='standard' type='search' />
            <TextField label='Mot de passe' variant='standard' type='search' />
            <TextField label='Adresse' variant='standard' type='search' />
            <TextField label='Code postal' variant='standard' type='search' />
            <TextField label='Pays' variant='standard' type='search' />
          </Stack>
          <Button
            variant='contained'
            color='primary'
            sx={{
              backgroundColor: 'black',
              textTransform: 'none',
              borderRadius: '10px',
            }}
          >
            Créer un compte
          </Button>
          <Stack
            spacing={0.5}
            direction='row'
            sx={{ justifyContent: 'center' }}
          >
            <Typography
              sx={{
                fontSize: '14px',
                textAlign: 'center',
              }}
            >
              {'Vous avez déjà un compte\u00A0? '}
              <Box
                component='span'
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={handleRedirect}
              >
                {'Se\u00A0connecter'}
              </Box>
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Register;
