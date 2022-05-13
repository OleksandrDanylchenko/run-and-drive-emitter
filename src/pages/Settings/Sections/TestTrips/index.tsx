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
import { useGetEngineerByIdQuery } from '@redux/queries/engineers';
import {
  useEndTripMutation,
  useGetActiveTripQuery,
  useGetTestTripsQuery,
  useStartTripMutation,
} from '@redux/queries/trips';
import { selectCarId, selectEngineerId } from '@redux/selectors/authentication_selectors';
import { selectFirstTripLocation } from '@redux/selectors/test_trip_selector';

const TestTripsCard: FC = () => {
  const carId = useAppSelector(selectCarId);
  const {
    data: car,
    isLoading: isCarLoading,
    error: carError,
  } = useGetCarByIdQuery(carId || skipToken);

  const engineerId = useAppSelector(selectEngineerId);
  const {
    data: engineer,
    isLoading: isEngineerLoading,
    error: engineerError,
  } = useGetEngineerByIdQuery(engineerId || skipToken);

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

  const firstTestTripLocation = useAppSelector(selectFirstTripLocation);

  const [startTrip] = useStartTripMutation();
  const [endTrip] = useEndTripMutation();

  const loading =
    !car ||
    isCarLoading ||
    !engineer ||
    isEngineerLoading ||
    !trips ||
    isTripsLoading ||
    isActiveTripLoading;
  const error = carError || engineerError || tripsError || activeTripError;
  if (loading || error) {
    return (
      <LoadingCard title="test trips" fetching={loading} error={error} linesNumber={10} />
    );
  }

  const handleTripStart = (tripId: string) => {
    if (!firstTestTripLocation) return;

    startTrip({
      carId: car.id,
      userId: engineer.user.id,
      location: firstTestTripLocation,
    });
  };

  const handleTripEnd = () => {
    if (!activeTrip?.id) return;
    endTrip({ tripId: activeTrip.id });
  };

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
        <TripSelector
          trips={trips}
          onTripStart={handleTripStart}
          onTripEnd={handleTripEnd}
        />
      </CardContent>
    </Card>
  );
};

export default TestTripsCard;
