import type { RootState } from '@redux/store';

export const selectAuthentication = (state: RootState) => state.authentication;

export const selectAuthData = (state: RootState) => selectAuthentication(state).authData;
export const selectEngineerId = (state: RootState) => selectAuthData(state)?.engineerId;
export const selectCarId = (state: RootState) => selectAuthData(state)?.carId;
