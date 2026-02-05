import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a51c1cff',
    },
  },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         minWidth: 150,
  //         height: 40,
  //         textTransform: 'none',
  //       },
  //     },
  //   },
  // },
});
