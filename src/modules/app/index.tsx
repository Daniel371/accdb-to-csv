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
      <Container
        maxWidth="xl"
        sx={{
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <AppBar
          ref={handleSetAppBarHeight}
          darkMode={darkMode}
          handleTogleTheme={handleTogleTheme}
        />
        <Box
          component="main"
          sx={{
            pt: 2,
            minHeight: mainHeight,
            maxHeight: mainHeight,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
