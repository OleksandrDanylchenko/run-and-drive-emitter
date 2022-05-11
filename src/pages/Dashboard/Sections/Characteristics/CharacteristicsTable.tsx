import React, { FC, useMemo } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import { TableRowData } from '@models/index';

const CharacteristicsTable: FC = () => {
  const tableRows = useMemo<TableRowData[]>(
    () => [
      {
        label: 'VIN',
        value: '4Y1SL65848Z411439',
      },
      {
        label: 'Model',
        value: 'Alfa Romeo Giulia',
      },
      {
        label: 'Color',
        value: 'Red',
      },
      {
        label: 'Mileage',
        value: '32663km.',
      },
      {
        label: 'Engine capacity',
        value: '2.0L.',
      },
      {
        label: 'Fuel tank capacity',
        value: '40L.',
      },
      {
        label: 'Washing liquid capacity',
        value: '500 ml.',
      },
    ],
    [],
  );

  return (
    <TableContainer>
      <Table aria-label="Characteristics table">
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

export default CharacteristicsTable;
