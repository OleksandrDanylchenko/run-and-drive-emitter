import Header from '@components/Header';
import HideOnScroll from '@components/HideOnScroll';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import React, { FC } from 'react';

import { CharacteristicsCard, IndicatorsCard, LocationCard } from './Sections';
import { Sections } from './styles';

const Dashboard: FC = () => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={3} css={Sections}>
        <LocationCard />
        <IndicatorsCard />
        <CharacteristicsCard />
      </Stack>
    </Container>
  );
};

export default Dashboard;
