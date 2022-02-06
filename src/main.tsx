import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';

import Routing from './navigation/Routing';

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssBaseline enableColorScheme />
      <Routing />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
