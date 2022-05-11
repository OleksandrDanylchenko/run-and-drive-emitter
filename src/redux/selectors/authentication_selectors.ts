import { createSelector } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import type { RootState } from '@redux/store';

export const selectAuthentication = (state: RootState) => state.authentication;

export const selectAuthData = (state: RootState) => selectAuthentication(state).authData;
export const selectEngineerId = (state: RootState) => selectAuthData(state)?.engineerId;
export const selectCarId = (state: RootState) => selectAuthData(state)?.carId;

export const selectActivatedAt = (state: RootState) => selectAuthData(state)?.activatedAt;
export const selectFormattedActivatedAt = createSelector(
  selectActivatedAt,
  (activatedAt) => {
    if (!activatedAt) return {};

    const dateTime = DateTime.fromISO(activatedAt);
    return {
      localeString: dateTime.toLocaleString(DateTime.DATETIME_SHORT),
      relative: dateTime.toRelative(),
    };
  },
);
