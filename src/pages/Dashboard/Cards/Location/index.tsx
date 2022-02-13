import ExploreIcon from '@mui/icons-material/Explore';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { FC, useMemo, useState } from 'react';

import { LocationTable, LocationTableRow } from './styles';

const LocationCard: FC = () => {
  const [isShowMap, setShowMap] = useState(false);
  const toggleMapShow = () => {
    setShowMap((showMap) => !showMap);
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h5">Location</Typography>
          <ExploreIcon />
        </Stack>
        <LocationValuesTable />
      </CardContent>
      <Collapse in={isShowMap} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Here is the map!
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing sx={{ justifyContent: 'end' }}>
        <Button size="small" onClick={toggleMapShow}>
          {isShowMap ? 'Hide map' : 'Show on map'}
        </Button>
      </CardActions>
    </Card>
  );
};

const LocationValuesTable: FC = () => {
  const tableRows = useMemo<
    {
      label: string;
      value: number | string;
      highlighted?: boolean;
    }[]
  >(
    () => [
      {
        label: 'Accuracy',
        value: 326,
        highlighted: true,
      },
      {
        label: 'Latitude',
        value: 59,
      },
      {
        label: 'Longitude',
        value: 22,
      },
      {
        label: 'Altitude',
        value: 224,
      },
      {
        label: 'Speed',
        value: 256,
      },
      {
        label: 'Heading',
        value: 125,
      },
    ],
    [],
  );

  return (
    <TableContainer css={LocationTable}>
      <Table aria-label="Location table">
        <TableBody>
          {tableRows
            .filter(({ value }) => !!value)
            .map((row) => (
              <TableRow
                key={row.label}
                css={(theme) => LocationTableRow(theme, row.highlighted)}>
                <TableCell>{row.label}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LocationCard;
