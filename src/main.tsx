import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline, StyledEngineProvider, Typography } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssBaseline enableColorScheme />
      <Typography variant={'h2'}>Hello, emitter</Typography>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
