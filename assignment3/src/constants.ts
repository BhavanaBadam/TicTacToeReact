import { createTheme } from '@mui/material';

export enum AppTheme {
  DARK = "dark",
  LIGHT = "light",
}

export const lightTheme = createTheme({
  palette: {
    background: {
      default: 'white'
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    background: {
      default: 'grey'
    }
  }
});
