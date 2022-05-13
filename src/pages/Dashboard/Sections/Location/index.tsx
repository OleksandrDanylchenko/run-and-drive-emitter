import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import ExploreIcon from '@mui/icons-material/Explore';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useAppSelector } from '@redux/hooks';
import { selectCurrentTripLocation } from '@redux/selectors/test_trip_selector';

import LocationTable from './LocationTable';

const LocationCard: FC = () => {
  const currentLocation = useAppSelector(selectCurrentTripLocation);

  const [isShowMap, setShowMap] = useState(false);
  const toggleMapShow = () => {
    setShowMap((showMap) => !showMap);
  };
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5">Location</Typography>
            <ExploreIcon />
          </Stack>
        }
      />
      {!currentLocation && (
        <Alert
          severity="info"
          action={
            <Button component={Link} size="small" color="inherit" to="settings">
              SELECT
            </Button>
          }
          sx={{ marginBottom: 0 }}>
          Test trip hasn&apos;t been selected yet
        </Alert>
      )}
      {currentLocation && (
        <>
          <CardContent>
            <LocationTable location={currentLocation} />
          </CardContent>
          <Collapse in={isShowMap} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Here is the map!
              </Typography>
            </CardContent>
          </Collapse>
          {/*<CardActions disableSpacing sx={{ justifyContent: 'end' }}>*/}
          {/*  <Button size="small" onClick={toggleMapShow}>*/}
          {/*    {isShowMap ? 'Hide map' : 'Show on map'}*/}
          {/*  </Button>*/}
          {/*</CardActions>*/}
        </>
      )}
    </Card>
  );
};

export default LocationCard;
