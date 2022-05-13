import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@redux/store';

export const selectTestTrip = (state: RootState) => state.testTrip.testTrip;

export const selectTestTripStep = (state: RootState) => state.testTrip.tripLocationStep;

export const selectFirstTripLocation = createSelector(
  selectTestTrip,
  (trip) => trip?.locations[0],
);

export const selectCurrentTripLocation = createSelector(
  selectTestTrip,
  selectTestTripStep,
  (trip, tripStep) => {
    if (!trip || tripStep === undefined) return;
    return trip.locations[tripStep];
  },
);
