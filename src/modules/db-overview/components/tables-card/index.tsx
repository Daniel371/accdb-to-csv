import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';

interface Props {
  tableNames: string[];
  handleGetColumns: (tableName: string) => void;
}

const TablesCard = (props: Props) => {
  const { tableNames, handleGetColumns } = props;
  return (
    <Card>
      <CardHeader
        title="Tables"
        titleTypographyProps={{
          variant: 'body1',
          color: 'text.secondary',
          align: 'center',
        }}
      />
      <Divider />
      <CardContent sx={{ width: 400 }}>
        <List>
          {tableNames.map((tableName) => (
            <ListItemButton
              key={tableName}
              dense
              onClick={() => handleGetColumns(tableName)}
            >
              <ListItemIcon>
                <TableChartRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={tableName} />
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TablesCard;
