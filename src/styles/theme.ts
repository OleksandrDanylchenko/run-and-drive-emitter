import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiSkeleton: {
      styleOverrides: {
        rectangular: {
          borderRadius: '4px',
        },
      },
    },
  },
});

export default theme;
