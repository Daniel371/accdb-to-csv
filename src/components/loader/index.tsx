import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GridLoader from 'react-spinners/GridLoader';

interface LoaderProps {
  loading: boolean;
  centerOnPage?: boolean;
}

const centerOnPageStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
};

const baseStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Loader = (props: LoaderProps) => {
  const theme = useTheme();
  const { loading, centerOnPage } = props;

  return (
    <Box sx={{ ...(centerOnPage ? centerOnPageStyle : baseStyle) }}>
      <GridLoader
        loading={loading}
        size={centerOnPage ? 20 : 10}
        color={theme.palette.primary.main}
      />
    </Box>
  );
};

Loader.defaultProps = {
  centerOnPage: false,
};

export default Loader;
