import { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import Loader from 'components/loader';

import showToast from 'utils/toast';
import ColumnsCard from './components/columns-card';
import TablesCard from './components/tables-card';
import type { ColumnType } from './types';

const DatabasePreview = () => {
  const location = useLocation();
  const { dbName, dbPath } = location.state;

  const [tableNames, setTableNames] = useState<string[]>([]);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [columnsLoading, setColumnsLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    // wait for 5 seconds to simulate a slow network

    window.app
      .getTableNames(dbPath)
      .then((tables: string[]) => {
        setTableNames(tables);
        setLoading(false);
      })
      .catch((err: Error) => {
        showToast(err.message, 'error');
        setLoading(false);
      });
  }, [dbPath]);

  const handleGetColumns = useCallback(
    (tableName: string) => {
      setColumnsLoading(true);
      window.app
        .getTableColumns(dbPath, tableName)
        .then((columns: ColumnType[]) => {
          setColumns(columns);
          setColumnsLoading(false);
        })
        .catch((err: Error) => {
          showToast(err.message, 'error');
          setColumns([]);
          setColumnsLoading(false);
        });
    },
    [dbPath]
  );

  if (loading) {
    return <Loader loading={loading} centerOnPage />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <TablesCard tableNames={tableNames} handleGetColumns={handleGetColumns} />
      <ColumnsCard columns={columns} loading={columnsLoading} />
    </Box>
  );
};

export default DatabasePreview;
