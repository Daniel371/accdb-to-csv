import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from '@mui/material';

import Loader from 'components/loader';
import { ColumnType } from 'modules/db-overview/types';
import ColumnsList from '../columns-list';

interface Props {
  columns: ColumnType[];
  loading: boolean;
}

const ColumnsCard = (props: Props) => {
  const { columns, loading } = props;

  return (
    <Card>
      <Stack>
        <CardHeader
          title="Fields"
          titleTypographyProps={{
            variant: 'body1',
            color: 'text.secondary',
            align: 'center',
          }}
        />
        <Divider />
        <CardContent sx={{ width: 400 }}>
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <ColumnsList columns={columns} />
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button fullWidth variant="contained">
            Show Table Content
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default ColumnsCard;
