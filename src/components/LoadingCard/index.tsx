import React, { FC, ReactElement, useMemo } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { FetchErrorAlert } from 'run-and-drive-lib/components';
import { getRandomInt } from 'run-and-drive-lib/utils';

import { mediaHeight } from '@pages/Dashboard/Sections/Characteristics/styles';

interface Props {
  title: string;
  showHeader?: boolean;
  showMedia?: boolean;
  showContent?: boolean;
  showActions?: boolean;
  linesNumber?: number;
  fetching: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const LoadingCard: FC<Props> = ({
  title,
  showHeader = true,
  showMedia = false,
  showContent = true,
  showActions = false,
  linesNumber = 4,
  fetching,
  error,
}) => {
  const skeletonLines = useMemo(() => generateSkeletonLines(linesNumber), [linesNumber]);

  if (error) {
    return <FetchErrorAlert title={`Cannot display the ${title} card`} error={error} />;
  }
  if (!fetching) return null;

  return (
    <Card>
      {showHeader && <CardHeader title={<Skeleton width="80%" />} />}
      {showMedia && <Skeleton sx={{ height: mediaHeight }} variant="rectangular" />}
      {showContent && (
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {fetching && skeletonLines}
        </CardContent>
      )}
      {showActions && (
        <CardActions disableSpacing sx={{ justifyContent: 'end' }}>
          <Skeleton width="40%" />
        </CardActions>
      )}
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
