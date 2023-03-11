import { useState, type SyntheticEvent } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import TabPanel from 'components/tab-panel';
import DBManager from 'modules/db-manager';

const Home = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Databases" />
          <Tab label="Tasks" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DBManager />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item One
      </TabPanel>
    </Box>
  );
};

export default Home;
