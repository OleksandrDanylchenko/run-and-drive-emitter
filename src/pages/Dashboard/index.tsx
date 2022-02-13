import SettingsIcon from '@mui/icons-material/Settings';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import SupportIcon from '@mui/icons-material/Support';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React, { FC } from 'react';

import { AppButton, AppButtonWrapper, AppToolbar } from './styles';

const Dashboard: FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar css={AppToolbar}>
          <Box css={AppButtonWrapper}>
            <Button size="large" startIcon={<SettingsInputAntennaIcon />} css={AppButton}>
              Emitter
            </Button>
          </Box>
          <IconButton size="large" aria-label="Contact support" color="inherit">
            <SupportIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="Activation engineer account"
            color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm"></Container>
    </>
  );
};

export default Dashboard;
