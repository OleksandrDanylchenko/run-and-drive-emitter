/// <reference types="vite/client" />

import { Theme as MaterialUITheme } from '@mui/material';

declare module '@emotion/react' {
  // eslint-disable-next-line no-unused-vars
  interface Theme extends MaterialUITheme {}
}
