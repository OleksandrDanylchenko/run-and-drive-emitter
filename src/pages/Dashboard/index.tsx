import Header from '@components/Header';
import HideOnScroll from '@components/HideOnScroll';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IndicatorsCard from '@pages/Dashboard/Sections/Indicators';
import LocationCard from '@pages/Dashboard/Sections/Location';
import React, { FC } from 'react';

import { Sections } from './styles';

const Dashboard: FC = () => {
  return (
    <>
      <HideOnScroll scrollTriggerProps={{ threshold: 50 }}>
        <Header />
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <Container maxWidth="sm">
        <Stack spacing={1} css={Sections}>
          <LocationCard />
          <IndicatorsCard />
        </Stack>
      </Container>
    </>
  );
};

export default Dashboard;
