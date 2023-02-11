import { createTheme } from '@mui/material/styles';

const fonts = ['Poppins', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
  ','
);

// Shared theme options
const commonTheme = {
  typography: {
    fontFamily: fonts,
  },
};

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  ...commonTheme,
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  ...commonTheme,
});
