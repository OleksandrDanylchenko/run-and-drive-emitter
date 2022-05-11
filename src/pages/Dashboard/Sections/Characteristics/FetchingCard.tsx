import React, { FC } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { mediaHeight } from '@pages/Dashboard/Sections/Characteristics/styles';
import { getErrorMessage } from '@utils/index';

interface Props {
  isFetching: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const FetchingCharacteristicsCard: FC<Props> = ({ isFetching, error }) => {
  return (
    <Card>
      {isFetching && <Skeleton sx={{ height: mediaHeight }} variant="rectangular" />}
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {isFetching && (
          <>
            <Skeleton width="90%" />
            <Skeleton width="85%" />
            <Skeleton width="87%" />
            <Skeleton width="93%" />
            <Skeleton width="86%" />
          </>
        )}
        {error && (
          <Alert severity="error">
            <AlertTitle>Cannot display characteristics</AlertTitle>
            {getErrorMessage(error)}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default FetchingCharacteristicsCard;
