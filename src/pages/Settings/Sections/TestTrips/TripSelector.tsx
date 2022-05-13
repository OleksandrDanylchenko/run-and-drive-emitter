import React, { FC, useMemo, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { skipToken } from '@reduxjs/toolkit/query';
import { getErrorMessage } from 'run-and-drive-lib/redux';

import { TestTripSummary } from '@models/api';
import TripsDetailsTable from '@pages/Settings/Sections/TestTrips/TripsDetailsTable';
import { useGetTestTripByIdQuery } from '@redux/queries/trips';

interface LocationTableProps {
  trips: TestTripSummary[];
}

const TripSelector: FC<LocationTableProps> = ({ trips }) => {
  const [tripId, setTripId] = useState<string>();
  const chosenTripSummary = useMemo(
    () => trips.find(({ id }) => id === tripId),
    [tripId, trips],
  );

  const [downloadTripId, setDownloadTripId] = useState<string>();
  const { isFetching: testTripFetching, error: testTripError } = useGetTestTripByIdQuery(
    downloadTripId || skipToken,
  );

  const handleTripChange = (event: SelectChangeEvent) => {
    setDownloadTripId(undefined);
    setTripId(event.target.value as string);
  };

  const handleTripLoad = () => {
    if (!tripId) return;
    setDownloadTripId(tripId);
  };

  return (
    <Stack spacing={3}>
      <FormControl fullWidth disabled={testTripFetching}>
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
      {chosenTripSummary && (
        <>
          <TripsDetailsTable tripSummary={chosenTripSummary} />
          {!testTripError ? (
            <LoadingButton
              variant="outlined"
              fullWidth
              loading={testTripFetching}
              onClick={handleTripLoad}>
              Choose the trip
            </LoadingButton>
          ) : (
            <Alert severity="error">
              <AlertTitle>
                Cannot download this test trip. Please choose another one
              </AlertTitle>
              {getErrorMessage(testTripError)}
            </Alert>
          )}
        </>
      )}
    </Stack>
  );
};

export default TripSelector;
