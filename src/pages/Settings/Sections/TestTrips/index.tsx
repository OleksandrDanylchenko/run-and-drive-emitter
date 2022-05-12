import React, { FC } from 'react';

import MapIcon from '@mui/icons-material/Map';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { skipToken } from '@reduxjs/toolkit/query';

import LoadingCard from '@components/LoadingCard';
import { useAppSelector } from '@redux/hooks';
import { useGetCarByIdQuery } from '@redux/queries/cars';
import { useGetTestTripsQuery } from '@redux/queries/trips';
import { selectCarId } from '@redux/selectors/authentication_selectors';

const TestTripsCard: FC = () => {
  const carId = useAppSelector(selectCarId);
  const {
    data: car,
    isLoading: isCarLoading,
    error: carError,
  } = useGetCarByIdQuery(carId || skipToken);

  const {
    data: trips,
    isLoading: isTripsLoading,
    error: tripsError,
  } = useGetTestTripsQuery();

  const loading = !car || isCarLoading || !trips || isTripsLoading;
  const error = carError || tripsError;
  if (loading || error) {
    return (
      <LoadingCard title="test trips" fetching={loading} error={error} linesNumber={2} />
    );
  }

  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5">Test trips</Typography>
            <MapIcon />
          </Stack>
        }
      />
      <CardContent>
        <Stack spacing={1}></Stack>
      </CardContent>
    </Card>
  );
};

export default TestTripsCard;
