import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TestTrip } from '@models/api';
import { tripsApi } from '@redux/queries/trips';

export interface TestTripState {
  testTrip?: TestTrip;
  serverTripId?: string; // id of the trip started on server that corresponds to the test trip
  tripLocationStep?: number;
}

const initialState: TestTripState = {
  testTrip: undefined,
  serverTripId: undefined,
  tripLocationStep: undefined,
};

const testTripSlice = createSlice({
  name: 'test-trip',
  initialState,
  reducers: {
    resetTestTrip: (state) => {
      state.testTrip = undefined;
      state.tripLocationStep = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      tripsApi.endpoints.getTestTripById.matchFulfilled,
      (state, { payload }) => {
        state.testTrip = payload;
        state.tripLocationStep = 0;
      },
    );
    builder.addMatcher(
      tripsApi.endpoints.startTrip.matchFulfilled,
      (state, { payload }) => {
        state.serverTripId = payload.id;
      },
    );
    builder.addMatcher(tripsApi.endpoints.endTrip.matchFulfilled, (state) => {
      state.serverTripId = undefined;
    });
  },
});

export default testTripSlice.reducer;

export const { resetTestTrip } = testTripSlice.actions;