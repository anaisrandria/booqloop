import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#e80aadff',
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
