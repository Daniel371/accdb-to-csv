import { createTheme } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';

const fonts = ['Poppins', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
  ','
);

type ButtonSizes = 'small' | 'medium' | 'large' | undefined;
type TextFieldSizes = 'small' | 'medium' | undefined;

// Shared theme options
const commonTheme = {
  typography: {
    fontFamily: fonts,
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small' as ButtonSizes,
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small' as TextFieldSizes,
      },
    },
  },
};

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: grey[100],
    },
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
