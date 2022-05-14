import React, { FC, useMemo } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Car, TableRowData } from 'run-and-drive-lib/models';
import { capitalizeFirstLetter } from 'run-and-drive-lib/utils';

interface Props {
  car: Car;
}

const CharacteristicsTable: FC<Props> = ({ car }) => {
  const tableRows = useMemo<TableRowData[]>(() => {
    const { vin, brand, model, color, year, mileage, engineCapacity, fuelCapacity } = car;
    return [
      {
        label: 'VIN',
        value: vin,
      },
      {
        label: 'Model',
        value: `${brand} ${model}`,
      },
      {
        label: 'Year',
        value: year,
      },
      {
        label: 'Color',
        value: capitalizeFirstLetter(color),
      },
      {
        label: 'Mileage',
        value: `${mileage}km.`,
      },
      {
        label: 'Engine capacity',
        value: `${engineCapacity}L.`,
      },
      {
        label: 'Fuel tank capacity',
        value: `${fuelCapacity}L.`,
      },
    ];
  }, [car]);

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
