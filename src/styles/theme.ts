import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

const theme = createTheme({
  components: {
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
      styleOverrides: {
        rectangular: {
          borderRadius: defaultTheme.shape.borderRadius,
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
          borderRadius: defaultTheme.shape.borderRadius,
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
