import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import SettingsIcon from '@mui/icons-material/Settings';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { ScrollToTop } from 'run-and-drive-lib/components';

import { HeaderButton, HeaderButtonWrapper, HeaderToolbar } from './styles';

const Header = forwardRef<HTMLHeadingElement>((_, ref) => {
  return (
    <AppBar ref={ref}>
      <Toolbar css={HeaderToolbar}>
        <ScrollToTop css={HeaderButtonWrapper}>
          <Button
            component={Link}
            size="large"
            startIcon={<SettingsInputAntennaIcon />}
            css={HeaderButton}
            to="/">
            Emitter
          </Button>
        </ScrollToTop>
        <IconButton
          component={Link}
          size="large"
          aria-label="Activation engineer account"
          color="inherit"
          to="settings">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';

export default Header;
