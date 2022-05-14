/* eslint-disable import/no-cycle */

import { createSlice } from '@reduxjs/toolkit';
import { SensorsRecord } from 'run-and-drive-lib/models';
import { FIVE_MINUTES, ONE_SECOND } from 'run-and-drive-lib/utils';

import { sensorsApi } from '@redux/queries/sensors';
import { tripsApi } from '@redux/queries/trips';

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
      (state, { payload, meta }) => {
        state.lastSensorsRecord = {
          id: payload.id,
          ...meta.arg.originalArgs,
        };
      },
    );
  },
});

export default emittingSlice.reducer;
