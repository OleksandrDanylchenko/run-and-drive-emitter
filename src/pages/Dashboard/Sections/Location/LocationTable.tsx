import React, { FC, useMemo } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { TableRowData } from 'run-and-drive-lib/models';

import { LocationTableRow } from './styles';

interface LocationTableProps {
  location: google.maps.LatLngLiteral;
}

const LocationTable: FC<LocationTableProps> = ({ location }) => {
  const tableRows = useMemo<TableRowData[]>(
    () => [
      {
        label: 'Latitude',
        value: toGeoString(location.lat),
      },
      {
        label: 'Longitude',
        value: toGeoString(location.lng),
      },
    ],
    [location.lat, location.lng],
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

const toGeoString = (geoNumber: number) => `${geoNumber.toFixed(6)}°`;

export default LocationTable;
