import humanizeDuration from 'humanize-duration';

import type { RootState } from '@redux/store';

export const selectEmittingRateMs = (state: RootState) => state.emitting.emittingRate;

export const selectEmittingRateHuman = (state: RootState) => {
  const rateMs = selectEmittingRateMs(state);
  return humanizeDuration(rateMs);
};
