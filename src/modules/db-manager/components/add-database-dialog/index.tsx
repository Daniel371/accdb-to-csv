import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  DialogActions,
  Button,
  InputLabel,
} from '@mui/material';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import type { AccessDb } from 'types/database';
import showToast from 'utils/toast';

type Props = {
  open: boolean;
  handleClose: (newDb: AccessDb | null) => void;
};

const initialFormData = {
  name: '',
  path: '',
};

const ACCESS_DB_EXTENSIONS = ['accdb', 'mdb'];

const AddDbDialog = (props: Props) => {
  const { open, handleClose } = props;

  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] =
    useState<Omit<AccessDb, 'id'>>(initialFormData);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const { path } = e.target.files[0];
      const extension = path.split('.').pop();
      if (!ACCESS_DB_EXTENSIONS.includes(extension || '')) {
        setError('Invalid file type');
        return;
      }
      if (path && !!error) setError(null);
      setFormData((prevFormData) => ({ ...prevFormData, path }));
    }
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (error) setError(null);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSave = () => {
    window.app
      .addDatabase(formData.name, formData.path)
      .then((id: number) => {
        handleClose({
          id,
          ...formData,
        });
        setFormData(initialFormData);
      })
      .catch((err: Error) => {
        setError(err.message);
        showToast(err.message, 'error');
      });
  };

  return (
    <Dialog open={open} onClose={() => handleClose(null)}>
      <DialogContent sx={{ minWidth: 500 }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            required
            onChange={handleTextFieldChange}
            name="name"
            label="Database Name"
            value={formData.name}
            sx={{ mt: 2 }}
          />

          <TextField
            fullWidth
            required
            name="path"
            onChange={handleTextFieldChange}
            value={formData.path}
            sx={{ flex: 1 }}
            label="Database Path"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton component="label">
                    <input hidden type="file" onChange={handleFileSelect} />
                    <FolderOpenRoundedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <InputLabel error={!!error}>
            {error || '* Fields are required'}
          </InputLabel>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          onClick={handleSave}
          variant="contained"
          color="success"
          startIcon={<SaveRoundedIcon />}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDbDialog;
