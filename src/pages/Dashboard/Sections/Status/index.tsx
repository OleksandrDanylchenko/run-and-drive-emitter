import React, { FC } from 'react';

import { css } from '@emotion/react';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import { Theme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useOnline } from 'run-and-drive-lib/hooks';
import { capitalizeFirstLetter } from 'run-and-drive-lib/utils';

const StatusCard: FC = () => {
  const isOnline = useOnline();
  const onlineStatus = isOnline ? 'Online' : 'Offline';

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
                <TableCell align="center" css={(theme) => NetworkStyle(theme, isOnline)}>
                  {capitalizeFirstLetter(onlineStatus)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

const NetworkStyle = (theme: Theme, isOnline: boolean | null) => {
  const { success, error } = theme.palette;
  return css`
    color: ${isOnline ? success.main : error.main};
    font-weight: bold;
    font-size: 0.9em;
  `;
};

export default StatusCard;
