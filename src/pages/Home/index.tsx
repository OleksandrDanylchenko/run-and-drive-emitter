import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';
import { skipToken } from '@reduxjs/toolkit/query';
import { HideOnScroll } from 'run-and-drive-lib/components';

import Header from '@components/Header';
import { useAppSelector } from '@redux/hooks';
import { carsApi } from '@redux/queries/cars';
import { engineersApi } from '@redux/queries/engineers';
import { tripsApi } from '@redux/queries/trips';
import { selectCarId, selectEngineerId } from '@redux/selectors/authentication_selectors';
import { FIVE_SECONDS, TEN_MINUTES } from '@utils/time';

const Home: FC = () => {
  const carId = useAppSelector(selectCarId);
  carsApi.endpoints.getCarById.useQuerySubscription(carId || skipToken, {
    pollingInterval: TEN_MINUTES,
  });

  tripsApi.endpoints.getActiveTrip.useQuerySubscription(undefined, {
    pollingInterval: FIVE_SECONDS,
  });

  const engineerId = useAppSelector(selectEngineerId);
  engineersApi.endpoints.getEngineerById.useQuerySubscription(engineerId || skipToken, {
    pollingInterval: TEN_MINUTES,
  });

  return (
    <>
      <HideOnScroll scrollTriggerProps={{ threshold: 50 }}>
        <Header />
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <Outlet />
    </>
  );
};

export default Home;
