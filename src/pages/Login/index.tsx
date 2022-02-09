/** @jsx jsx */
import { jsx } from '@emotion/react';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Title, TitleBlock } from '@pages/Login/styles';
import React, { FC } from 'react';

const Login: FC = () => {
  return (
    <Container maxWidth="sm">
      <Box css={TitleBlock}>
        <Typography variant="h1" css={Title}>
          Please activate the emitter
        </Typography>
        <SettingsInputAntennaIcon fontSize="large" />
      </Box>
    </Container>
  );
};

export default Login;
