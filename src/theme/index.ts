import { createTheme } from '@mui/material/styles';

const fonts = ["Poppins", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
  ",",
);

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: fonts,
  },

  palette: {
    mode: "dark",
  }

});

export default theme;