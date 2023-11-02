import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import './fonts/fonts.css';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['"YS Text"', '"YS Display"'].join(','),
    h1: {
      fontFamily: 'YS Display',
      fontSize: '34px',
      lineHeight: '40px',
    },
    h2: {
      fontFamily: 'YS Display',
      fontSize: '24px',
      lineHeight: '32px',
    },
    h3: {
      fontFamily: 'YS Display',
      fontSize: '20px',
      lineHeight: '24px',
    },
    subtitle1: {
      fontFamily: 'YS Text',
      fontSize: '18px',
      lineHeight: '24px',
    },
    body1: {
      fontFamily: 'YS Text',
      fontSize: '16px',
      lineHeight: '20px',
    },
    body2: {
      fontFamily: 'YS Text',
      fontSize: '14px',
      lineHeight: '20px',
    },
    caption: {
      fontFamily: 'YS Text',
      fontSize: '13px',
      lineHeight: '16px',
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
