import React, { FC } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { skipToken } from '@reduxjs/toolkit/query';

import { useAppSelector } from '@redux/hooks';
import { carsApi } from '@redux/queries/cars';
import { selectCarId } from '@redux/selectors/authentication_selectors';

import { CharacteristicsCard, IndicatorsCard, LocationCard } from './Sections';
import { Sections } from './styles';

const TEN_MINUTES = 10 * 60;

const Dashboard: FC = () => {
  const carId = useAppSelector(selectCarId);
  carsApi.endpoints.getCarById.useQuerySubscription(carId || skipToken, {
    refetchOnMountOrArgChange: TEN_MINUTES,
  });

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
