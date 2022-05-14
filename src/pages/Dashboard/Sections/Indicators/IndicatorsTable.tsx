import React, { FC, useMemo } from 'react';

import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Car, TableRowData } from 'run-and-drive-lib/models';
import { toPercentString } from 'run-and-drive-lib/utils';

import { PressureRow } from '@pages/Dashboard/Sections/Indicators/styles';
import { useAppSelector } from '@redux/hooks';
import { selectLastSensorsRecord } from '@redux/selectors/emitting_selectors';

interface Props {
  car: Car;
}

const IndicatorsTable: FC<Props> = ({ car }) => {
  const lastSensorsRecord = useAppSelector(selectLastSensorsRecord);

  const tableRows = useMemo<TableRowData[]>(() => {
    const { fuelCapacity } = car;
    const { fuelTankOccupancy, wheelsPressure } = lastSensorsRecord || {
      fuelTankOccupancy: fuelCapacity,
      wheelsPressure: null,
    };

    const fuelTankOccupancyPercent = toPercentString(fuelTankOccupancy / fuelCapacity);

    return [
      {
        label: 'Fuel tank occupancy',
        value: (
          <Typography variant="body2">
            <strong>{fuelTankOccupancy.toFixed(1)}L.</strong> / {fuelCapacity}L. <br /> (
            {fuelTankOccupancyPercent})
          </Typography>
        ),
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
  }, [car, lastSensorsRecord]);

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
