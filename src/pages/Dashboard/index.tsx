import React, { FC } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { skipToken } from '@reduxjs/toolkit/query';

import { useAppSelector } from '@redux/hooks';
import { carsApi } from '@redux/queries/cars';
import { selectCarId } from '@redux/selectors/authentication_selectors';
import { TEN_MINUTES } from '@utils/time';

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
