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
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { FC, useState } from 'react';

import { LocationTable } from './styles';

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
        <TableContainer css={LocationTable}>
          <Table aria-label="Location table">
            <TableHead>
              <TableCell align="center">Latitude</TableCell>
              <TableCell align="center">Longitude</TableCell>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">59</TableCell>
                <TableCell align="center">2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
