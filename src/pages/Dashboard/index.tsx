import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

import { AppButton } from './styles';

const Dashboard: FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button variant="contained" disableElevation css={AppButton}>
            <SettingsInputAntennaIcon />
            <Typography variant="h6">Emitter</Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm"></Container>
    </>
  );
};

export default Dashboard;
