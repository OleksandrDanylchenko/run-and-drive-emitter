import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';
import { skipToken } from '@reduxjs/toolkit/query';
import { HideOnScroll } from 'run-and-drive-lib/components';

import Header from '@components/Header';
import {
  startStationaryEmitting,
  stopStationaryEmitting,
} from '@redux/actions/emitting_actions';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useGetCarByIdQuery } from '@redux/queries/cars';
import { selectCarId } from '@redux/selectors/authentication_selectors';
import { TEN_MINUTES } from '@utils/time';

const Home: FC = () => {
  const dispatch = useAppDispatch();

  const carId = useAppSelector(selectCarId);
  const { isSuccess } = useGetCarByIdQuery(carId || skipToken, {
    pollingInterval: TEN_MINUTES,
  });

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(startStationaryEmitting);

    return () => {
      dispatch(stopStationaryEmitting);
    };
  }, [dispatch, isSuccess]);

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
