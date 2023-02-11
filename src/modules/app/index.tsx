import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { darkTheme, lightTheme } from 'theme';
import AppBar from 'components/app-bar';

const App = () => {
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleSetAppBarHeight = (ref: HTMLDivElement) => {
    if (ref) {
      setAppBarHeight(ref.clientHeight);
    }
  };

  const handleTogleTheme = useCallback(() => {
    setDarkMode((prevDarkMode: boolean) => !prevDarkMode);
  }, []);

  const mainHeight = `calc(100vh - ${appBarHeight}px)`;
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ overflow: 'hidden' }}>
        <AppBar
          ref={handleSetAppBarHeight}
          darkMode={darkMode}
          handleTogleTheme={handleTogleTheme}
        />
        <Container
          maxWidth="xl"
          component="main"
          sx={{
            minHeight: mainHeight,
            maxHeight: mainHeight,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Container>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
