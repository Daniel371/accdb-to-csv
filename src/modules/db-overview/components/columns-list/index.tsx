import {
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Placeholder from 'components/placeholder-text';

import type { ColumnType } from '../../types';

interface Props {
  columns: ColumnType[];
}

const ColumnsList = (props: Props) => {
  const { columns } = props;

  return (
    <div>
      {columns.length > 0 ? (
        <List>
          {columns.map((column) => (
            <ListItemButton key={column.name} dense>
              <ListItemIcon>
                <Checkbox sx={{ p: 0 }} defaultChecked />
              </ListItemIcon>
              <ListItemText primary={column.name} secondary={column.type} />
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Placeholder text="Select a table..." />
      )}
    </div>
  );
};

export default ColumnsList;
