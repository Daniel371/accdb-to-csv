import { useState, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Switch,
  IconButton,
  List,
  ListItem,
  Popover,
  ListItemText,
  ListItemIcon,
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  Typography,
} from '@mui/material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';

import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import DarkModeSwitch from 'components/dark-mode-switch';
import Divider from '@mui/material/Divider';

interface Props {
  darkMode: boolean;
  handleTogleTheme: () => void;
}

const AppBar = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const location = useLocation();
  const title = location.state?.title || '';
  const navigate = useNavigate();
  const { darkMode, handleTogleTheme } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isHome = location.pathname === '/';
  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <MuiAppBar
      ref={ref}
      color="transparent"
      position="relative"
      sx={{ boxShadow: 'none' }}
    >
      <Toolbar
        disableGutters
        variant="dense"
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: isHome ? 'flex-end' : 'space-between',
          pl: 0,
          pr: 0,
        }}
      >
        {!isHome && (
          <>
            <Button
              onClick={handleNavigateBack}
              size="large"
              color="primary"
              startIcon={<ArrowBackRoundedIcon />}
            >
              Back
            </Button>

            <Typography color="primary">{title}</Typography>
          </>
        )}

        <IconButton onClick={handleClick} color="primary">
          <SettingsRoundedIcon fontSize="large" />
        </IconButton>
        <Popover
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={<ListSubheader>Settings</ListSubheader>}
          >
            <ListItem>
              <ListItemIcon>
                <DesktopWindowsIcon />
              </ListItemIcon>
              <ListItemText primary="Start with Windows" />
              <Switch edge="end" onChange={() => {}} checked />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AutorenewIcon />
              </ListItemIcon>
              <ListItemText primary="Start tasks on launch" />
              <Switch edge="end" onChange={() => {}} checked />
            </ListItem>
            <ListItemButton>
              <ListItemIcon>
                <BrowserUpdatedIcon />
              </ListItemIcon>
              <ListItemText primary="Check for updates" />
            </ListItemButton>
            <Divider />
            <ListItem>
              <DarkModeSwitch checked={darkMode} onChange={handleTogleTheme} />
            </ListItem>
          </List>
        </Popover>
      </Toolbar>
    </MuiAppBar>
  );
});

AppBar.displayName = 'AppBar';

export default AppBar;
