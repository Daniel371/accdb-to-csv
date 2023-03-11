import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import DatabaseIcon from 'svg/database-icon';
import type { AccessDb, AccessDbList } from 'types/database';
import showToast from 'utils/toast';
import AddDatabaseDialog from './components/add-database-dialog';

const DBManager = () => {
  const navigate = useNavigate();
  const [addDbOpen, setAddDbOpen] = useState<boolean>(false);
  const [databases, setDatabases] = useState<AccessDbList>([]);

  useEffect(() => {
    window.app.getDatabases().then((dbs: AccessDbList) => setDatabases(dbs));
  }, []);

  const handleAddDbOpen = () => setAddDbOpen(true);
  const handleAddDbClose = (newDb: AccessDb | null = null) => {
    if (newDb) {
      setDatabases((prevDbs) => [...prevDbs, newDb]);
      showToast(`${newDb.name} added!`, 'success');
    }
    setAddDbOpen(false);
  };

  const handleDeleteDb = (id: number, name: string) => {
    window.app.deleteDatabase(id).then(() => {
      setDatabases((prevDbs) => prevDbs.filter((db) => db.id !== id));
      showToast(`${name} deleted!`, 'success');
    });
  };

  const handleNavigateToDbPreview = (dbName: string, dbPath: string) => {
    navigate('/database', { state: { dbName, dbPath, title: dbName } });
  };

  return (
    <>
      {/* Open dialog */}
      <Stack direction="row" justifyContent="space-between">
        <TextField
          label="Filter"
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
          onClick={handleAddDbOpen}
        >
          Add Database
        </Button>
      </Stack>

      {/* List of connections */}
      <List>
        {databases.map((db) => (
          <Fragment key={db.id}>
            <ListItemButton
              onClick={() => handleNavigateToDbPreview(db.name, db.path)}
            >
              <ListItemIcon>
                <DatabaseIcon />
              </ListItemIcon>
              <ListItemText primary={db.name} secondary={db.path} />
              <IconButton
                color="error"
                onClick={() => handleDeleteDb(db.id, db.name)}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </ListItemButton>

            <Divider />
          </Fragment>
        ))}
      </List>

      {/* Dialog to add new ms_access db */}
      <AddDatabaseDialog open={addDbOpen} handleClose={handleAddDbClose} />
    </>
  );
};

export default DBManager;
