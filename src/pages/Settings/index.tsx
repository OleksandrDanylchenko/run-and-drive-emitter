import React, { FC, useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import DeactivateModal from '@pages/Settings/DeactivateModal';
import EngineerCard from '@pages/Settings/Sections/Engineer';
import TestTripsCard from '@pages/Settings/Sections/TestTrips';

import { SettingsWrapper } from './styles';

const Settings: FC = () => {
  const [isDeactivationOpened, setDeactivationOpened] = useState(false);
  const toggleDeactivation = () => {
    setDeactivationOpened((deactivationOpened) => !deactivationOpened);
  };

  return (
    <Container maxWidth="sm" css={SettingsWrapper}>
      <Stack spacing={3}>
        <EngineerCard />
        <TestTripsCard />
      </Stack>
      <Button
        variant="contained"
        color="error"
        size="large"
        fullWidth
        onClick={toggleDeactivation}>
        Deactivate emitter
      </Button>
      <DeactivateModal open={isDeactivationOpened} onClose={toggleDeactivation} />
    </Container>
  );
};

export default Settings;
