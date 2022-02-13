import ScrollToTop from '@components/ScrollToTop';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import SupportIcon from '@mui/icons-material/Support';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React, { FC } from 'react';

import { HeaderButton, HeaderButtonWrapper, HeaderToolbar } from './styles';

const Header: FC = () => {
  return (
    <AppBar>
      <Toolbar css={HeaderToolbar}>
        <ScrollToTop css={HeaderButtonWrapper}>
          <Button
            size="large"
            startIcon={<SettingsInputAntennaIcon />}
            css={HeaderButton}>
            Emitter
          </Button>
        </ScrollToTop>
        <IconButton size="large" aria-label="Contact support" color="inherit">
          <SupportIcon />
        </IconButton>
        <IconButton size="large" aria-label="Activation engineer account" color="inherit">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
