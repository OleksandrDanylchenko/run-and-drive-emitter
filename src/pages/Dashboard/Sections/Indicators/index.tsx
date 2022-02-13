import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

const IndicatorsCard: FC = () => {
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
    </Card>
  );
};

export default IndicatorsCard;