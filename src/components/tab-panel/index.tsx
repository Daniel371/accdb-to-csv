import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface Props {
  index: number;
  value: number;
  children?: ReactNode;
}

const TabPanel = (props: Props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.defaultProps = {
  children: null,
};

export default TabPanel;
