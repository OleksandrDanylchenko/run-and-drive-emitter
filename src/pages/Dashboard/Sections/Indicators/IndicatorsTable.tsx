import React, { FC, useMemo } from 'react';

import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Car, SensorRecord } from 'run-and-drive-lib/models';
import { toPercentString } from 'run-and-drive-lib/utils';

import { TableRowData } from '@models/index';
import { PressureRow } from '@pages/Dashboard/Sections/Indicators/styles';

interface Props {
  car: Car;
}

const IndicatorsTable: FC<Props> = ({ car }) => {
  const tableRows = useMemo<TableRowData[]>(() => {
    const { fuelTankOccupancy, wheelsPressure } = {
      fuelTankOccupancy: 2,
      wheelsPressure: {
        frontLeft: 1.2,
        frontRight: 1.3,
        rearLeft: 1.3,
        rearRight: 1.1,
      },
    } as SensorRecord;
    const { fuelCapacity } = car;

    const fuelTankOccupancyPercent = toPercentString(fuelTankOccupancy / fuelCapacity);

    return [
      {
        label: 'Fuel tank occupancy',
        value: `${fuelCapacity}L. (${fuelTankOccupancyPercent})`,
      },
      {
        label: 'Wheels pressure',
        value: wheelsPressure ? (
          <Stack spacing={1}>
            <Typography variant="body2" css={PressureRow}>
              Front Left: {wheelsPressure.frontLeft} bar
              <br />
              Front Right: {wheelsPressure.frontRight} bar
            </Typography>
            <Typography variant="body2" css={PressureRow}>
              Rear Left: {wheelsPressure.rearLeft} bar
              <br />
              Rear Right: {wheelsPressure.rearRight} bar
            </Typography>
          </Stack>
        ) : (
          'Ø'
        ),
      },
    ];
  }, [car]);

  return (
    <TableContainer>
      <Table aria-label="Indicators table">
        <TableBody>
          {tableRows
            .filter(({ value }) => !!value)
            .map((row) => (
              <TableRow key={row.label}>
                <TableCell>{row.label}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IndicatorsTable;
