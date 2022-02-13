import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import React, { FC, useMemo } from 'react';

import { LocationTable as LocationTableStyles, LocationTableRow } from './styles';

const LocationTable: FC = () => {
  const tableRows = useMemo<
    {
      label: string;
      value: number | string;
      highlighted?: boolean;
    }[]
  >(
    () => [
      {
        label: 'Accuracy',
        value: 326,
        highlighted: true,
      },
      {
        label: 'Latitude',
        value: 59,
      },
      {
        label: 'Longitude',
        value: 22,
      },
      {
        label: 'Altitude',
        value: 224,
      },
      {
        label: 'Speed',
        value: 256,
      },
      {
        label: 'Heading',
        value: 125,
      },
    ],
    [],
  );

  return (
    <TableContainer css={LocationTableStyles}>
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
