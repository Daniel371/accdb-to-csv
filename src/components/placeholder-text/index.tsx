import { Box, Typography } from '@mui/material';

const Placeholder = ({ text }: { text: string }) => (
  <Box
    sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'cetner',
      justifyContent: 'center',
    }}
  >
    <Typography color="text.secondary">{text}</Typography>
  </Box>
);

export default Placeholder;
