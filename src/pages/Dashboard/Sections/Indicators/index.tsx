import React, { FC } from 'react';

import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { skipToken } from '@reduxjs/toolkit/query';

import LoadingCard from '@components/LoadingCard';
import IndicatorsTable from '@pages/Dashboard/Sections/Indicators/IndicatorsTable';
import { useAppSelector } from '@redux/hooks';
import { carsApi } from '@redux/queries/cars';
import { selectCarId } from '@redux/selectors/authentication_selectors';

const IndicatorsCard: FC = () => {
  const carId = useAppSelector(selectCarId);
  const {
    data: car,
    isLoading: isCarLoading,
    error: carError,
  } = carsApi.endpoints.getCarById.useQueryState(carId || skipToken);

  if (!car || isCarLoading || carError) {
    return (
      <LoadingCard isFetching={!car || isCarLoading} error={carError} linesNumber={2} />
    );
  }

  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5">Indicators</Typography>
            <LocalGasStationIcon />
          </Stack>
        }
      />
      <CardContent>
        <IndicatorsTable car={car} />
      </CardContent>
    </Card>
  );
};

export default IndicatorsCard;
