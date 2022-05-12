import React, { FC } from 'react';

import MapIcon from '@mui/icons-material/Map';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { skipToken } from '@reduxjs/toolkit/query';

import LoadingCard from '@components/LoadingCard';
import TripSelector from '@pages/Settings/Sections/TestTrips/TripSelector';
import { useAppSelector } from '@redux/hooks';
import { useGetCarByIdQuery } from '@redux/queries/cars';
import { useGetActiveTripQuery, useGetTestTripsQuery } from '@redux/queries/trips';
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

  const {
    data: activeTrip,
    isLoading: isActiveTripLoading,
    error: activeTripError,
  } = useGetActiveTripQuery();

  const loading = !car || isCarLoading || !trips || isTripsLoading || isActiveTripLoading;
  const error = carError || tripsError || activeTripError;
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
        {activeTrip ? (
          "YOU'RE ALREADY IN THE TRIP, IDIOT"
        ) : (
          <TripSelector trips={trips} car={car} />
        )}
      </CardContent>
    </Card>
  );
};

export default TestTripsCard;
