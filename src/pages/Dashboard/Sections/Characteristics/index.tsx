import React, { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';

import { CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { skipToken } from '@reduxjs/toolkit/query';

import CharacteristicsTable from '@pages/Dashboard/Sections/Characteristics/CharacteristicsTable';
import LoadingCharacteristicsCard from '@pages/Dashboard/Sections/Characteristics/LoadingCard';
import { useAppSelector } from '@redux/hooks';
import { useGetCarByIdQuery } from '@redux/queries/cars';
import { selectCarId } from '@redux/selectors/authentication_selectors';

const tenMinutes = 10 * 60;

const CharacteristicsCard: FC = () => {
  const carId = useAppSelector(selectCarId);
  const {
    data: car,
    isLoading: isCarLoading,
    error: carError,
  } = useGetCarByIdQuery(carId || skipToken, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: tenMinutes,
  });

  if (!car || isCarLoading || carError) {
    return (
      <LoadingCharacteristicsCard isFetching={!car || isCarLoading} error={carError} />
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
