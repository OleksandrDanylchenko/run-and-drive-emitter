import { createSlice } from '@reduxjs/toolkit';

import { tripsApi } from '@redux/queries/trips';
import { FIVE_MINUTES, ONE_SECOND } from '@utils/time';

export interface EmittingState {
  emittingRate: number; // Number of ms. between emits
}

const initialState: EmittingState = {
  emittingRate: FIVE_MINUTES,
};

const emittingSlice = createSlice({
  name: 'emitting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      tripsApi.endpoints.getActiveTrip.matchFulfilled,
      (state, { payload }) => {
        state.emittingRate = payload ? ONE_SECOND : FIVE_MINUTES;
      },
    );
  },
});

export default emittingSlice.reducer;
