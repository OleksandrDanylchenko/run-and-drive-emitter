import React, { FC, useState } from 'react';

import ExploreIcon from '@mui/icons-material/Explore';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import LoadingCard from '@components/LoadingCard';
import { useLocation } from '@hooks/useLocation';

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
  if (!location) {
    return <LoadingCard title="location" fetching={!location} />;
  }
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
      <CardContent>
        <LocationTable location={location} />
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

export default LocationCard;
