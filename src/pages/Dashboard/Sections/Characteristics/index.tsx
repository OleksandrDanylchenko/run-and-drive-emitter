import CarRepairIcon from '@mui/icons-material/CarRepair';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

const CharacteristicsCard: FC = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5">Characteristics</Typography>
            <CarRepairIcon />
          </Stack>
        }
      />
      <CardContent></CardContent>
    </Card>
  );
};

export default CharacteristicsCard;
