import { FC, useCallback, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Marker } from '@react-google-maps/api';
import { GoogleMap } from 'run-and-drive-lib/components';
import { toMeters } from 'run-and-drive-lib/utils';

import { GOOGLE_MAPS_KEY } from '@constants/index';
import { TestTripSummary } from '@models/api';

interface Props {
  tripSummary: TestTripSummary;
}

const TripsDetailsTable: FC<Props> = ({ tripSummary }) => {
  return (
    <TableContainer>
      <Table aria-label="Trip details table">
        <TableBody>
          <TableRow>
            <TableCell>Distance</TableCell>
            <TableCell align="center">{toMeters(tripSummary.totalDistance)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} css={TripsDetailsMapCell}>
              <TripDetailsMap tripSummary={tripSummary} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TripDetailsMap: FC<Props> = ({ tripSummary }) => {
  const { startLocation, endLocation } = tripSummary;

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
          <Marker position={startLocation} icon={getMarkerIcon('start')} />
          <Marker position={endLocation} icon={getMarkerIcon('end')} />
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

export default TripsDetailsTable;
