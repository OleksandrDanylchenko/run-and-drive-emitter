import { useLocation } from '@hooks/useLocation';
import ExploreIcon from '@mui/icons-material/Explore';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FC, useState } from 'react';

import LocationTable from './LocationTable';

const LocationCard: FC = () => {
  const [isShowMap, setShowMap] = useState(false);
  const toggleMapShow = () => {
    setShowMap((showMap) => !showMap);
  };

  const [location, locationError] = useLocation();

  if (locationError) {
    return (
      <Alert variant="filled" severity="error">
        <AlertTitle>Location Error</AlertTitle>
        Code: {locationError.code} <br />
        {locationError.message}
      </Alert>
    );
  }
  return (
    <Card>
      <CardHeader
        title={
          location ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h5">Location</Typography>
              <ExploreIcon />
            </Stack>
          ) : (
            <Skeleton width="80%" />
          )
        }
      />
      <CardContent>
        {location ? (
          <LocationTable location={location} />
        ) : (
          <Skeleton variant="rectangular" height={300} />
        )}
      </CardContent>
      <Collapse in={isShowMap} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Here is the map!
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing sx={{ justifyContent: 'end' }}>
        {location ? (
          <Button size="small" onClick={toggleMapShow}>
            {isShowMap ? 'Hide map' : 'Show on map'}
          </Button>
        ) : (
          <Skeleton width="40%" />
        )}
      </CardActions>
    </Card>
  );
};

export default LocationCard;
