import React, { FC, useMemo } from 'react';

import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { TableRowData } from '@models/index';
import { PressureRow } from '@pages/Dashboard/Sections/Indicators/styles';

const IndicatorsTable: FC = () => {
  const tableRows = useMemo<TableRowData[]>(
    () => [
      {
        label: 'Fuel tank occupancy',
        value: '2L. (47%)',
      },
      {
        label: 'Washing liquid occupancy',
        value: '300ml. (23%)',
      },
      {
        label: 'Wheels pressure',
        value: (
          <Stack spacing={1}>
            <Typography variant="body2" css={PressureRow}>
              Front Left: 20 bar
              <br />
              Front Right: 2 bar
            </Typography>
            <Typography variant="body2" css={PressureRow}>
              Rear Left: 2 bar
              <br />
              Rear Right: 20 bar
            </Typography>
          </Stack>
        ),
      },
    ],
    [],
  );

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
