import { createAsyncThunk, createListenerMiddleware } from '@reduxjs/toolkit';
import { skipToken } from '@reduxjs/toolkit/query';
import { DateTime } from 'luxon';
import { SensorsRecord, Car } from 'run-and-drive-lib/models';

import { carsApi } from '@redux/queries/cars';
import { sensorsApi } from '@redux/queries/sensors';
import { tripsApi } from '@redux/queries/trips';
import { selectCarId } from '@redux/selectors/authentication_selectors';
import {
  selectEmittingRateMs,
  selectLastSensorsRecord,
} from '@redux/selectors/emitting_selectors';

import {
  selectActiveTripId,
  selectCurrentTripLocation,
  selectTestTrip,
  selectTestTripStep,
} from '../selectors/test_trip_selector';
import { increaseTestTripStep } from '../slices/test_trip_slice';

import type { AppDispatch, AppThunkApi, RootState } from '@redux/store';

let currentEmittingRate: number;
let emittingTimerId: number;

const endTrip = (state: RootState, dispatch: AppDispatch) => {
  const tripId = selectActiveTripId(state);
  if (!tripId) return;

  return dispatch(tripsApi.endpoints.endTrip.initiate({ tripId })).unwrap();
};

export const startEmitting = createAsyncThunk<void, void, AppThunkApi>(
  'START_EMITTING',
  async (_, { getState, dispatch }) => {
    const initialState = getState();

    debugger;

    currentEmittingRate = selectEmittingRateMs(initialState);
    emittingTimerId = setTimeout(async function emitRecord() {
      const emittingState = getState();

      try {
        const currentLocation = selectCurrentTripLocation(emittingState);
        if (!currentLocation) return;

        const carId = selectCarId(initialState);
        const lastSensorsRecord = selectLastSensorsRecord(emittingState);
        const { data: car } = carsApi.endpoints.getCarById.select(carId || skipToken)(
          initialState,
        );
        if (!carId || !car) return;

        const fuelTankOccupancy = getStationaryFuelOccupancy(lastSensorsRecord, car);
        if (!fuelTankOccupancy) {
          // We ran out of gas
          await endTrip(emittingState, dispatch);
          return;
        }

        const isoTimestamp = DateTime.now().toISO();
        await dispatch(
          sensorsApi.endpoints.createRecord.initiate({
            location: currentLocation,
            carId: carId,
            fuelTankOccupancy,
            timestamp: isoTimestamp,
          }),
        ).unwrap();
        dispatch(increaseTestTripStep());
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

const getStationaryFuelOccupancy = (lastSensorsRecord?: SensorsRecord, car?: Car) => {
  if (lastSensorsRecord) return lastSensorsRecord.fuelTankOccupancy;
  if (car) return car.fuelCapacity * 0.95; // HACK, use 95% of the gas tank as the starter value
  return 0;
};

export const stopEmitting = createAsyncThunk('STOP_EMITTING', async () => {
  currentEmittingRate = 0;
  clearTimeout(emittingTimerId);
});

export const emittingListenerMiddleware = createListenerMiddleware();
emittingListenerMiddleware.startListening({
  actionCreator: increaseTestTripStep,
  effect: async (action, { getState, dispatch }) => {
    const appDispatch = dispatch as AppDispatch;
    const state = getState() as RootState;
    const testTrip = selectTestTrip(state);
    if (!testTrip) return;

    const tripStep = selectTestTripStep(state);
    if (!tripStep) return;

    if (tripStep <= testTrip.locations.length) return;

    // We went through all the steps
    await endTrip(state, appDispatch);
  },
});
