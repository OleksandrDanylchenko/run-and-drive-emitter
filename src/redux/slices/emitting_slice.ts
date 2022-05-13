/* eslint-disable import/no-cycle */

import { createSlice } from '@reduxjs/toolkit';
import { SensorsRecord } from 'run-and-drive-lib/models';

import { sensorsApi } from '@redux/queries/sensors';
import { tripsApi } from '@redux/queries/trips';
import { FIVE_MINUTES, ONE_SECOND } from '@utils/time';

export interface EmittingState {
  emittingRate: number; // Number of ms. between emits,
  lastSensorsRecord?: SensorsRecord;
}

const initialState: EmittingState = {
  emittingRate: FIVE_MINUTES,
  lastSensorsRecord: undefined,
};

const emittingSlice = createSlice({
  name: 'emitting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(tripsApi.endpoints.startTrip.matchFulfilled, (state) => {
      state.emittingRate = ONE_SECOND;
    });
    builder.addMatcher(tripsApi.endpoints.endTrip.matchFulfilled, (state) => {
      state.emittingRate = FIVE_MINUTES;
    });
    builder.addMatcher(
      sensorsApi.endpoints.createRecord.matchFulfilled,
      (state, { meta }) => {
        state.lastSensorsRecord = meta.arg.originalArgs;
      },
    );
  },
});

export default emittingSlice.reducer;
