import { useState, useEffect } from 'react';
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import DatabaseIcon from 'svg/database-icon';

const DBManager = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.app.getDatabases().then((dbs) => console.log(dbs));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {/* Open dialog */}
      <Stack direction="row" justifyContent="space-between">
        <TextField
          label="Search"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={handleOpen}
        >
          Add Database
        </Button>
      </Stack>

      {/* List of connections */}
      <List>
        <ListItem
          secondaryAction={
            <IconButton color="error">
              <DeleteRoundedIcon />
            </IconButton>
          }
        >
          <ListItemIcon>
            <DatabaseIcon />
          </ListItemIcon>
          <ListItemText
            primary="Database 1"
            secondary="C:\Users\user\database1.db"
          />
        </ListItem>
        <Divider />
        <ListItem
          secondaryAction={
            <IconButton color="error">
              <DeleteRoundedIcon />
            </IconButton>
          }
        >
          <ListItemIcon>
            <DatabaseIcon />
          </ListItemIcon>
          <ListItemText
            primary="Database 2"
            secondary="C:\Users\user\database2.db"
          />
        </ListItem>
        <Divider />
      </List>

      {/* Dialog to add new connection */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField label="Database Name" sx={{ width: 300 }} />

            <TextField
              sx={{ flex: 1 }}
              label="Database Path"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FolderOpenRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddRoundedIcon />}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DBManager;
