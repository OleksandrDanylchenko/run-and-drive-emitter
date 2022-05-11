import React, { FC, ReactElement, useMemo } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { getRandomInt } from 'run-and-drive-lib/utils';

import { mediaHeight } from '@pages/Dashboard/Sections/Characteristics/styles';
import { getErrorMessage } from '@utils/index';

interface Props {
  showMedia?: boolean;
  linesNumber?: number;
  isFetching: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const LoadingCard: FC<Props> = ({
  showMedia = true,
  linesNumber = 4,
  isFetching,
  error,
}) => {
  const skeletonLines = useMemo(() => generateSkeletonLines(linesNumber), [linesNumber]);

  return (
    <Card>
      {showMedia && isFetching && (
        <Skeleton sx={{ height: mediaHeight }} variant="rectangular" />
      )}
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {isFetching && skeletonLines}
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

const generateSkeletonLines = (
  number: number,
  minPercent = 80,
  maxPercent = 95,
): ReactElement[] => {
  const lines: ReactElement[] = [];
  for (let i = 0; i < number; i++) {
    const widthPercent = getRandomInt(minPercent, maxPercent);
    lines.push(<Skeleton key={i} width={`${widthPercent}%`} />);
  }
  return lines;
};

export default LoadingCard;
