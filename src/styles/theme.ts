import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
      styleOverrides: {
        rectangular: {
          borderRadius: '4px',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          paddingBottom: 0,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: `1px solid ${grey.A200}`,
        },
      },
    },
  },
});

export default theme;
