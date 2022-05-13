import { FC, useMemo } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Trip } from 'run-and-drive-lib/models';
import { timeToHumanAndRelative } from 'run-and-drive-lib/utils';

import { useAppSelector } from '@redux/hooks';
import { selectTestTrip, selectTestTripStep } from '@redux/selectors/test_trip_selector';

interface Props {
  trip: Trip;
}

const OngoingTripDetailsTable: FC<Props> = ({ trip }) => {
  const {
    start: { time },
    totalDistance,
  } = trip;
  const { localeString, relative } = useMemo(() => timeToHumanAndRelative(time), []);

  const testTripStep = useAppSelector(selectTestTripStep);
  const tripTripLocations = useAppSelector(
    (state) => selectTestTrip(state)?.locations?.length,
  );

  return (
    <TableContainer>
      <Table aria-label="Ongoing trip details table">
        <TableBody>
          <TableRow>
            <TableCell>Start time</TableCell>
            <TableCell align="center">
              {localeString} ({relative})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Distance passed</TableCell>
            <TableCell align="center">{totalDistance}m.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Test trip stage</TableCell>
            <TableCell align="center">
              {testTripStep} of {tripTripLocations || 'Ø'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OngoingTripDetailsTable;
