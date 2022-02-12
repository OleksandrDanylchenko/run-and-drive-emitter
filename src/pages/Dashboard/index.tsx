import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import SupportIcon from '@mui/icons-material/Support';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React, { FC } from 'react';

import { AppButton, AppButtonWrapper } from './styles';

const Dashboard: FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box css={AppButtonWrapper}>
            <Button startIcon={<SettingsInputAntennaIcon />} css={AppButton}>
              Emitter
            </Button>
          </Box>
          <IconButton aria-label="Contact support" color="inherit">
            <SupportIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm"></Container>
    </>
  );
};

export default Dashboard;
