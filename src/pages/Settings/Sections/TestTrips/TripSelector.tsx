import React, { FC, useState, useMemo, useCallback, useEffect } from 'react';

import { css } from '@emotion/react';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
import { Marker } from '@react-google-maps/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { GoogleMap } from 'run-and-drive-lib/components';
import { getErrorMessage } from 'run-and-drive-lib/redux';
import { toMeters } from 'run-and-drive-lib/utils';

import { GOOGLE_MAPS_KEY } from '@constants/index';
import { TestTripSummary } from '@models/api';
import { useGetTestTripByIdQuery } from '@redux/queries/trips';

interface LocationTableProps {
  trips: TestTripSummary[];
}

const TripSelector: FC<LocationTableProps> = ({ trips }) => {
  const [tripId, setTripId] = useState<string>();
  const chosenTrip = useMemo(
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
      {chosenTrip && (
        <>
          <TableContainer>
            <Table aria-label="Trip details table">
              <TableBody>
                <TableRow>
                  <TableCell>Distance</TableCell>
                  <TableCell align="center">
                    {toMeters(chosenTrip.totalDistance)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} css={TripsDetailsMapCell}>
                    {/*<TripDetailsMap chosenTrip={chosenTrip} />*/}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {!testTripError ? (
            <LoadingButton variant="outlined" fullWidth onClick={handleTripLoad}>
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

const TripDetailsMap: FC<{ chosenTrip: TestTripSummary }> = ({ chosenTrip }) => {
  const { startLocation, endLocation } = chosenTrip;

  const [mapInstance, setMapInstance] = useState<google.maps.Map>();

  useEffect(() => {
    if (!mapInstance) return;

    const start = new google.maps.LatLng(startLocation);
    const end = new google.maps.LatLng(endLocation);
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(start);
    bounds.extend(end);
    mapInstance.fitBounds(bounds);
  }, [endLocation, mapInstance, startLocation]);

  const getMarkerIcon = useCallback<(type: 'start' | 'end') => google.maps.Icon>(
    (type) => {
      const markerSize = 33;

      const markerUrl =
        type === 'start'
          ? 'https://i.ibb.co/x7cwmS1/red-marker.png'
          : 'https://i.ibb.co/phXQnbk/blue-marker.png';

      return {
        url: markerUrl,
        scaledSize: new google.maps.Size(markerSize, markerSize),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(markerSize / 2, markerSize / 2),
      };
    },
    [],
  );

  return (
    <GoogleMap
      apiKey={GOOGLE_MAPS_KEY}
      onMapLoad={(map: google.maps.Map) => setMapInstance(map)}
      css={TripsDetailsMap}>
      {mapInstance && (
        <>
          <Marker key="start" position={startLocation} icon={getMarkerIcon('start')} />
          <Marker key="end" position={endLocation} icon={getMarkerIcon('end')} />
        </>
      )}
    </GoogleMap>
  );
};

const TripsDetailsMapCell = css`
  padding: 0;
  height: 320px;
`;

const TripsDetailsMap = css`
  width: 100%;
  height: 100%;
`;

export default TripSelector;
