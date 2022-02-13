import HideOnScroll from '@components/HideOnScroll';
import ScrollToTop from '@components/ScrollToTop';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import SupportIcon from '@mui/icons-material/Support';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IndicatorsCard from '@pages/Dashboard/Sections/Indicators';
import LocationCard from '@pages/Dashboard/Sections/Location';
import React, { FC } from 'react';

import { AppButton, AppButtonWrapper, AppToolbar, CardsList } from './styles';

const Dashboard: FC = () => {
  return (
    <>
      <HideOnScroll scrollTriggerProps={{ threshold: 50 }}>
        <AppBar>
          <Toolbar css={AppToolbar}>
            <ScrollToTop css={AppButtonWrapper}>
              <Button
                size="large"
                startIcon={<SettingsInputAntennaIcon />}
                css={AppButton}>
                Emitter
              </Button>
            </ScrollToTop>
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
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <Container maxWidth="sm">
        <Stack spacing={1} css={CardsList}>
          <LocationCard />
          <IndicatorsCard />
        </Stack>
      </Container>
    </>
  );
};

export default Dashboard;
