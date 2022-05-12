import React, { FC, useState, useMemo } from 'react';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Car } from 'run-and-drive-lib/models';
import { toMeters } from 'run-and-drive-lib/utils';

import { TestTripSummary } from '@models/api';

interface LocationTableProps {
  trips: TestTripSummary[];
  car: Car;
}

const TripSelector: FC<LocationTableProps> = ({ trips, car }) => {
  const [tripId, setTripId] = useState<string>();
  const chosenTrip = useMemo(
    () => trips.find(({ id }) => id === tripId),
    [tripId, trips],
  );

  const handleTripChange = (event: SelectChangeEvent) => {
    setTripId(event.target.value as string);
  };

  return (
    <Stack spacing={3}>
      <FormControl fullWidth>
        <InputLabel id="trips-select-label">Trip path</InputLabel>
        <Select
          labelId="trips-select-label"
          id="trips-select"
          value={tripId}
          label="Trip path"
          onChange={handleTripChange}>
          {trips.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
        {!tripId && <FormHelperText>Choose the test trip path</FormHelperText>}
      </FormControl>
      {chosenTrip && (
        <TableContainer>
          <Table aria-label="Trip details table">
            <TableBody>
              <TableRow>
                <TableCell>Distance</TableCell>
                <TableCell align="center">{toMeters(chosenTrip.totalDistance)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hello!</TableCell>
                <TableCell align="center">gsdgsdg</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default TripSelector;
