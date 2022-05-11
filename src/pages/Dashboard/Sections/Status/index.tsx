import React, { FC } from 'react';

import { css } from '@emotion/react';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import { Theme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useOnline } from 'run-and-drive-lib/hooks';
import { capitalizeFirstLetter } from 'run-and-drive-lib/utils';

import { useGetActiveTripQuery } from '@redux/queries/trips';
import { FIVE_SECONDS } from '@utils/time';

const StatusCard: FC = () => {
  const isOnline = useOnline();
  const onlineStatus = isOnline ? 'Online' : 'Offline';

  const {
    data: activeTrip,
    isLoading,
    error,
  } = useGetActiveTripQuery(undefined, {
    pollingInterval: FIVE_SECONDS,
  });

  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5">Status</Typography>
            <SettingsInputAntennaIcon />
          </Stack>
        }
      />
      <CardContent>
        <TableContainer>
          <Table aria-label="Status table">
            <TableBody>
              <TableRow>
                <TableCell>Network connection</TableCell>
                <TableCell
                  align="center"
                  css={(theme) =>
                    NetworkStyle(theme, { success: !!isOnline, error: !isOnline })
                  }>
                  {capitalizeFirstLetter(onlineStatus)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Server connection</TableCell>
                <TableCell
                  align="center"
                  css={(theme) =>
                    NetworkStyle(theme, { success: !error, error: !!error })
                  }>
                  {isLoading ? <CircularProgress size={15} /> : 'Online'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Emitting rate</TableCell>
                <TableCell align="center">
                  {capitalizeFirstLetter(onlineStatus)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Trip status</TableCell>
                <TableCell
                  align="center"
                  css={(theme) =>
                    NetworkStyle(theme, { success: !!activeTrip, error: !!error })
                  }>
                  {activeTrip ? 'In a trip' : 'Free for a trip'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

const NetworkStyle = (theme: Theme, options: { success: boolean; error: boolean }) => {
  const { success, error } = options;
  const {
    success: { main: successColor },
    error: { main: errorColor },
  } = theme.palette;
  return css`
    ${success && `color: ${successColor};`}
    ${error && `color: ${errorColor};`}
    font-weight: bold;
    font-size: 0.9em;
  `;
};

export default StatusCard;
