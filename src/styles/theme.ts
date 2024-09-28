import { createTheme as muiCreateTheme } from '@mui/material/styles';

const theme = muiCreateTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
        },
      },
    },
  },
});

export default theme;

function createTheme(arg0: { palette: { primary: { main: string; light: string; dark: string; contrastText: string; }; secondary: { main: string; light: string; dark: string; contrastText: string; }; error: { main: string; light: string; dark: string; contrastText: string; }; warning: { main: string; light: string; dark: string; contrastText: string; }; info: { main: string; light: string; dark: string; contrastText: string; }; success: { main: string; light: string; dark: string; contrastText: string; }; background: { default: string; paper: string; }; text: { primary: string; secondary: string; disabled: string; }; }; typography: { fontFamily: string; h1: { fontSize: string; fontWeight: number; }; h2: { fontSize: string; fontWeight: number; }; h3: { fontSize: string; fontWeight: number; }; h4: { fontSize: string; fontWeight: number; }; h5: { fontSize: string; fontWeight: number; }; h6: { fontSize: string; fontWeight: number; }; body1: { fontSize: string; lineHeight: number; }; body2: { fontSize: string; lineHeight: number; }; }; shape: { borderRadius: number; }; spacing: number; components: { MuiButton: { styleOverrides: { root: { textTransform: string; }; }; }; MuiAppBar: { styleOverrides: { root: { boxShadow: string; }; }; }; }; }) {
    throw new Error("Function not implemented.");
}
