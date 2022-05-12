import React, { FC } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { skipToken } from '@reduxjs/toolkit/query';
import { stringAvatar } from 'run-and-drive-lib/utils';

import LoadingCard from '@components/LoadingCard';
import { useAppSelector } from '@redux/hooks';
import { carsApi } from '@redux/queries/cars';
import { useGetEngineerByIdQuery } from '@redux/queries/engineers';
import {
  selectCarId,
  selectEngineerId,
  selectFormattedActivatedAt,
} from '@redux/selectors/authentication_selectors';
import { TEN_MINUTES } from '@utils/time';

const EngineerCard: FC = () => {
  const engineerId = useAppSelector(selectEngineerId);
  const {
    data: engineer,
    isLoading: isEngineerLoading,
    error: engineerError,
  } = useGetEngineerByIdQuery(engineerId || skipToken, {
    pollingInterval: TEN_MINUTES,
  });
  const { localeString, relative } = useAppSelector(selectFormattedActivatedAt);

  if (!engineer || isEngineerLoading || engineerError) {
    return (
      <LoadingCard
        title="engineer"
        fetching={!engineer || isEngineerLoading}
        error={engineerError}
        linesNumber={2}
      />
    );
  }

  const {
    employeeNumber,
    user: { name, surname, photoUrl },
  } = engineer;
  const engineerFullname = `${name} ${surname}`;

  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5">Engineer</Typography>
            <EngineeringIcon />
          </Stack>
        }
      />
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              {...stringAvatar(engineerFullname)}
              src={photoUrl}
              sx={{ width: 35, height: 35 }}
            />
            <Typography>
              {engineerFullname}, №{employeeNumber}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon sx={{ width: 35, height: 35 }} aria-label="Activated at" />
            <Typography>
              {localeString} ({relative})
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EngineerCard;
