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
  },
});

export default theme;
