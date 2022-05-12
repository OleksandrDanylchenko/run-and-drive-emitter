import { createAsyncThunk } from '@reduxjs/toolkit';
import { skipToken } from '@reduxjs/toolkit/query';
import { DateTime } from 'luxon';
import { SensorsRecord, Car } from 'run-and-drive-lib/models';

import { carsApi } from '@redux/queries/cars';
import { sensorsApi } from '@redux/queries/sensors';
import { selectCarId } from '@redux/selectors/authentication_selectors';
import {
  selectEmittingRateMs,
  selectLastSensorsRecord,
} from '@redux/selectors/emitting_selectors';
import { AppThunkApi } from '@redux/store';

let currentEmittingRate: number;
let emittingTimerId: number;

export const startStationaryEmitting = createAsyncThunk<void, void, AppThunkApi>(
  'START_EMITTING',
  async (_, { getState, dispatch }) => {
    const initialState = getState();

    currentEmittingRate = selectEmittingRateMs(initialState);
    emittingTimerId = setTimeout(async function emitRecord() {
      const emittingState = getState();

      try {
        const currentPosition = await getCurrentPosition();
        const {
          coords: { latitude, longitude },
          timestamp,
        } = currentPosition;

        const lastSensorsRecord = selectLastSensorsRecord(emittingState);

        const carId = selectCarId(emittingState);
        if (!carId) return;

        const { data: car } = carsApi.endpoints.getCarById.select(carId || skipToken)(
          emittingState,
        );

        const fuelTankOccupancy = await getStationaryFuelOccupancy(
          lastSensorsRecord,
          car,
        );
        const isoTimestamp = DateTime.fromMillis(timestamp).toISO();
        dispatch(
          sensorsApi.endpoints.createRecord.initiate({
            location: { lat: latitude, lng: longitude },
            carId,
            fuelTankOccupancy,
            timestamp: isoTimestamp,
          }),
        );
      } catch (error) {
        console.error('Geolocation error', error);
      } finally {
        if (currentEmittingRate) {
          currentEmittingRate = selectEmittingRateMs(emittingState);
          emittingTimerId = setTimeout(emitRecord, currentEmittingRate);
        }
      }
    }, currentEmittingRate);
  },
);

const getCurrentPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
    });
  });

const getStationaryFuelOccupancy = (lastSensorsRecord?: SensorsRecord, car?: Car) => {
  if (lastSensorsRecord) return lastSensorsRecord.fuelTankOccupancy;
  if (car) return car.fuelCapacity * 0.95; // HACK, use 95% of the gas tank as the starter value
  return 0;
};

export const stopStationaryEmitting = createAsyncThunk('STOP_EMITTING', async () => {
  currentEmittingRate = 0;
  clearTimeout(emittingTimerId);
});
