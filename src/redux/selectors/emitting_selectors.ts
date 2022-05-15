import { createSelector } from '@reduxjs/toolkit';
import humanizeDuration from 'humanize-duration';

import type { RootState } from '@redux/store';

export const selectEmitting = (state: RootState) => state.emitting;

export const selectEmittingRateMs = (state: RootState) =>
  selectEmitting(state).emittingRate;

export const selectEmittingRateHuman = createSelector(selectEmittingRateMs, (rateMs) =>
  humanizeDuration(rateMs, { round: true }),
);

export const selectLastSensorsRecord = (state: RootState) =>
  selectEmitting(state).lastSensorsRecord;
