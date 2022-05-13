import React, {FC, useMemo, useState} from 'react';

import {css} from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import {skipToken} from '@reduxjs/toolkit/query';
import {BindingAction, BindingCallback1} from 'run-and-drive-lib/models';
import {getErrorMessage} from 'run-and-drive-lib/redux';

import {TestTripSummary} from '@models/api';
import TripsDetailsTable from '@pages/Settings/Sections/TestTrips/TripsDetailsTable';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {useGetTestTripByIdQuery,} from '@redux/queries/trips';
import {selectActiveTripId, selectTestTrip} from '@redux/selectors/test_trip_selector';
import {resetTestTrip} from '@redux/slices/test_trip_slice';

interface LocationTableProps {
  trips: TestTripSummary[];
  onTripStart: BindingCallback1<string>;
  onTripEnd: BindingAction;
}

const TripSelector: FC<LocationTableProps> = ({ trips, onTripStart, onTripEnd }) => {
  const dispatch = useAppDispatch();

  const downloadedTestTrip = useAppSelector(selectTestTrip);

  const [chosenTripId, setChosenTripId] = useState<string | undefined>(
    downloadedTestTrip?.id,
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

  const handleTripDelete = () => {
    setDownloadTripId(undefined);
    onTripEnd();
    dispatch(resetTestTrip());
  };

  const activeTripId = useAppSelector(selectActiveTripId);

  const handleTripStart = () => {
    if (!chosenTripId) return;
    onTripStart(chosenTripId);
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
              readOnly={!!downloadedTestTrip}
              onChange={handleTripChange}
              css={SelectorStyles}
              classes={{
                icon: downloadedTestTrip ? 'icon-arrow' : undefined,
              }}>
              {trips.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {!chosenTripId && <FormHelperText>Choose the test trip path</FormHelperText>}
          </Stack>
          {downloadedTestTrip && <DeleteTestTrip onDelete={handleTripDelete} />}
        </Stack>
      </FormControl>
      {chosenTripSummary && <TripsDetailsTable tripSummary={chosenTripSummary} />}
      {!downloadedTestTrip && (
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
      {downloadedTestTrip && !activeTripId && (
        <Stack direction="row" spacing={2}>
          <LoadingButton
            variant="outlined"
            fullWidth
            loading={testTripFetching}
            onClick={handleTripStart}>
            Start the trip
          </LoadingButton>
        </Stack>
      )}
      {downloadedTestTrip && activeTripId && (
        <Stack direction="row" spacing={2}>
          <LoadingButton
            variant="outlined"
            color="error"
            fullWidth
            loading={false}
            onClick={onTripEnd}>
            Stop the trip
          </LoadingButton>
        </Stack>
      )}
    </Stack>
  );
};

const DeleteTestTrip: FC<{ onDelete: BindingAction }> = ({ onDelete }) => {
  const activeTripId = useAppSelector(selectActiveTripId);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (activeTripId) {
      setOpen(true);
    } else {
      onDelete();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleClose();
    onDelete();
  };

  return (
    <>
      <IconButton
        aria-label="Delete the chosen trip"
        color="error"
        onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete the test trip?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After deletion the in-progress trip will stop. Are you surely want to delete
            it now?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} color="error">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const SelectorStyles = css`
  .icon-arrow {
    display: none;
  }
`;

export default TripSelector;
