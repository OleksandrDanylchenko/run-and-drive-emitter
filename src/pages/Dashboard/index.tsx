import React, { FC } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import {
  CharacteristicsCard,
  IndicatorsCard,
  LocationCard,
  StatusCard,
} from './Sections';
import { Sections } from './styles';

const Dashboard: FC = () => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={3} css={Sections}>
        <StatusCard />
        <LocationCard />
        <IndicatorsCard />
        <CharacteristicsCard />
      </Stack>
    </Container>
  );
};

export default Dashboard;
