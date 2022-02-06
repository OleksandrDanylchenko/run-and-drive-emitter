import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routing from './navigation/Routing';
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CssBaseline enableColorScheme />
        <Routing />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
