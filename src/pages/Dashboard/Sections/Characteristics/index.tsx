import React, { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';

import { CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { skipToken } from '@reduxjs/toolkit/query';

import LoadingCard from '@components/LoadingCard';
import CharacteristicsTable from '@pages/Dashboard/Sections/Characteristics/CharacteristicsTable';
import { useAppSelector } from '@redux/hooks';
import { carsApi } from '@redux/queries/cars';
import { selectCarId } from '@redux/selectors/authentication_selectors';

const CharacteristicsCard: FC = () => {
  const carId = useAppSelector(selectCarId);
  const {
    data: car,
    isLoading: isCarLoading,
    error: carError,
  } = carsApi.endpoints.getCarById.useQueryState(carId || skipToken);

  if (!car || isCarLoading || carError) {
    return (
      <LoadingCard isFetching={!car || isCarLoading} error={carError} linesNumber={7} />
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
        <CharacteristicsTable car={car} />
      </CardContent>
    </Card>
  );
};

export default CharacteristicsCard;
