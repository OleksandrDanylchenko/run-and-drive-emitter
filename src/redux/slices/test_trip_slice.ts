import { createSlice } from '@reduxjs/toolkit';

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      tripsApi.endpoints.getTestTripById.matchFulfilled,
      (state, { payload }) => {
        state.testTrip = payload;
        state.tripLocationStep = 0;
      },
    );
  },
});

export default testTripSlice.reducer;
