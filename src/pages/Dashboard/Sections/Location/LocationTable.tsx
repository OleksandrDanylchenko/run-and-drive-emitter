import { TableRowData } from '@models/index';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import React, { FC, useMemo } from 'react';

import { LocationTableRow } from './styles';

interface LocationTableProps {
  location: GeolocationCoordinates;
}

const LocationTable: FC<LocationTableProps> = ({ location }) => {
  const { accuracy, latitude, longitude, altitude, speed, heading } = location;

  const tableRows = useMemo<TableRowData[]>(
    () => [
      {
        label: 'Accuracy',
        value: toMeters(accuracy),
        highlighted: true,
      },
      {
        label: 'Latitude',
        value: latitude,
      },
      {
        label: 'Longitude',
        value: longitude,
      },
      {
        label: 'Altitude',
        value: toMeters(altitude),
      },
      {
        label: 'Speed',
        value: toKmPerHour(speed),
      },
      {
        label: 'Heading',
        value: heading,
      },
    ],
    [],
  );

  return (
    <TableContainer>
      <Table aria-label="Location table">
        <TableBody>
          {tableRows
            .filter(({ value }) => !!value)
            .map((row) => (
              <TableRow
                key={row.label}
                css={(theme) => LocationTableRow(theme, row.highlighted)}>
                <TableCell>{row.label}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const toMeters = (meters: number | null) => (meters ? `~${meters.toFixed(1)}m.` : null);

// https://youtu.be/ud27dGObAvU?t=262
const toKmPerHour = (metersPerSecond: number | null) =>
  metersPerSecond ? `~${metersPerSecond * 3.6}m.` : null;

export default LocationTable;
