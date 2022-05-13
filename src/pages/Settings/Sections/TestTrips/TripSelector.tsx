import React, { FC, useMemo, useState } from 'react';

import { css } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { skipToken } from '@reduxjs/toolkit/query';
import { getErrorMessage } from 'run-and-drive-lib/redux';

import { TestTripSummary } from '@models/api';
import TripsDetailsTable from '@pages/Settings/Sections/TestTrips/TripsDetailsTable';
import { useAppSelector } from '@redux/hooks';
import { useGetTestTripByIdQuery } from '@redux/queries/trips';
import { selectTestTrip } from '@redux/selectors/test_trip_selector';

interface LocationTableProps {
  trips: TestTripSummary[];
}

const TripSelector: FC<LocationTableProps> = ({ trips }) => {
  const chosenTestTrip = useAppSelector(selectTestTrip);

  const [chosenTripId, setChosenTripId] = useState<string | undefined>(
    chosenTestTrip?.id,
  );
  const chosenTripSummary = useMemo(
    () => trips.find(({ id }) => id === chosenTripId),
    [chosenTripId, trips],
  );

  const [downloadTripId, setDownloadTripId] = useState<string>();
  const { isFetching: testTripFetching, error: testTripError } = useGetTestTripByIdQuery(
    downloadTripId || skipToken,
  );

  const handleTripChange = (event: SelectChangeEvent) => {
    setDownloadTripId(undefined);
    setChosenTripId(event.target.value as string);
  };

  const handleTripLoad = () => {
    if (!chosenTripId) return;
    setDownloadTripId(chosenTripId);
  };

  return (
    <Stack spacing={3}>
      <FormControl fullWidth disabled={testTripFetching}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack flex={1}>
            <InputLabel id="trips-select-label">Trip path</InputLabel>
            <Select
              label="Trip path"
              labelId="trips-select-label"
              id="trips-select"
              value={chosenTripId}
              readOnly={!!chosenTestTrip}
              onChange={handleTripChange}
              css={SelectorStyles}
              classes={{
                icon: chosenTestTrip ? 'icon-arrow' : undefined,
              }}>
              {trips.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {!chosenTripId && <FormHelperText>Choose the test trip path</FormHelperText>}
          </Stack>
          {chosenTestTrip && (
            <IconButton aria-label="Delete the chosen trip" color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
      </FormControl>
      {chosenTripSummary && <TripsDetailsTable tripSummary={chosenTripSummary} />}
      {!chosenTestTrip && (
        <>
          {!testTripError ? (
            <LoadingButton
              variant="outlined"
              fullWidth
              loading={testTripFetching}
              onClick={handleTripLoad}>
              Load the trip
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
      {chosenTestTrip && (
        <Stack direction="row" spacing={2}>
          <LoadingButton
            variant="outlined"
            fullWidth
            loading={testTripFetching}
            onClick={() => alert('Start the trip!')}>
            Start the trip
          </LoadingButton>
        </Stack>
      )}
    </Stack>
  );
};

const SelectorStyles = css`
  .icon-arrow {
    display: none;
  }
`;

export default TripSelector;
