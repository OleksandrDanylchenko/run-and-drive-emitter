import React, { FC } from 'react';

import { CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import CharacteristicsTable from '@pages/Dashboard/Sections/Characteristics/CharacteristicsTable';

const CharacteristicsCard: FC = () => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="195"
        image="https://upload.wikimedia.org/wikipedia/commons/a/a9/2017_Alfa_Romeo_Giulia_V6_Biturbo_Quadrifoglio_2.9.jpg"
        alt="Alfa Romeo Giulia"
      />
      <CardContent>
        <CharacteristicsTable />
      </CardContent>
    </Card>
  );
};

export default CharacteristicsCard;
