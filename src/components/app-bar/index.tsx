import { useState, forwardRef } from 'react';
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
} from '@mui/material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';

import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import DarkModeSwitch from 'components/dark-mode-switch';
import Divider from '@mui/material/Divider';

interface Props {
  darkMode: boolean;
  handleTogleTheme: () => void;
}

const AppBar = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { darkMode, handleTogleTheme } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <MuiAppBar
      ref={ref}
      color="transparent"
      position="relative"
      sx={{ boxShadow: 'none' }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={handleClick} size="large" color="primary">
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
