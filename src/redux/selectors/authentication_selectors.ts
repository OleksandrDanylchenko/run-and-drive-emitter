import { createSelector } from '@reduxjs/toolkit';
import { timeToHumanAndRelative } from 'run-and-drive-lib/utils';

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
    return timeToHumanAndRelative(activatedAt);
  },
);
