import React, { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';

import { CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { skipToken } from '@reduxjs/toolkit/query';

import CharacteristicsTable from '@pages/Dashboard/Sections/Characteristics/CharacteristicsTable';
import FetchingCharacteristicsCard from '@pages/Dashboard/Sections/Characteristics/FetchingCard';
import { useAppSelector } from '@redux/hooks';
import { useGetCarByIdQuery } from '@redux/queries/cars';
import { selectCarId } from '@redux/selectors/authentication_selectors';

const CharacteristicsCard: FC = () => {
  const carId = useAppSelector(selectCarId);
  const {
    data: car,
    isFetching: isCarFetching,
    error: carError,
  } = useGetCarByIdQuery(carId || skipToken);

  if (!car || isCarFetching || carError) {
    return (
      <FetchingCharacteristicsCard isFetching={!car || isCarFetching} error={carError} />
    );
  }

  const { brand, model, year, photosUrls } = car;
  return (
    <Card>
      {photosUrls.length > 0 && (
        <CardMedia>
          <Carousel
            ariaLabel={`${brand} ${model}, ${year}`}
            infiniteLoop
            emulateTouch
            showThumbs={false}>
            {photosUrls.map((url) => (
              <div key={url}>
                <img src={url} alt="" />
              </div>
            ))}
          </Carousel>
        </CardMedia>
      )}
      <CardContent>
        <CharacteristicsTable />
      </CardContent>
    </Card>
  );
};

export default CharacteristicsCard;
