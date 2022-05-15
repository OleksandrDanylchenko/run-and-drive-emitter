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
        value: location.lat,
      },
      {
        label: 'Longitude',
        value: location.lng,
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

export default LocationTable;
