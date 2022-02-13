import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import KeyIcon from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

import { EngineerHeader, EngineerWrapper, SettingsWrapper } from './styles';

const Settings: FC = () => {
  return (
    <Container maxWidth="sm" css={SettingsWrapper}>
      <Paper elevation={9} css={EngineerWrapper}>
        <Stack spacing={2}>
          <Typography variant="h4" css={EngineerHeader}>
            Activation engineer:
          </Typography>
          <Stack direction="row" spacing={1}>
            <AssignmentIndIcon />
            <Typography>Oleksandr Danylchenko</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <KeyIcon />
            <Typography>eyweb3</Typography>
          </Stack>
        </Stack>
      </Paper>
      <Button variant="contained" color="error" size="large" fullWidth>
        Deactivate emitter
      </Button>
    </Container>
  );
};

export default Settings;
