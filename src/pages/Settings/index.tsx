import React, { FC, useState } from 'react';

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import KeyIcon from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EngineerCard from '@pages/Settings/Sections/Engineer';

import { EngineerHeader, EngineerWrapper, SettingsWrapper } from './styles';

const Settings: FC = () => {
  const [isDeactivationOpened, setDeactivationOpened] = useState(false);
  const toggleDeactivation = () => {
    setDeactivationOpened((deactivationOpened) => !deactivationOpened);
  };

  return (
    <Container maxWidth="sm" css={SettingsWrapper}>
      <EngineerCard />
      <Button
        variant="contained"
        color="error"
        size="large"
        fullWidth
        onClick={toggleDeactivation}>
        Deactivate emitter
      </Button>
      {/*<DeactivateModal open={isDeactivationOpened} onClose={toggleDeactivation} />*/}
    </Container>
  );
};

export default Settings;
