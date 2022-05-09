import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EmitterAuthData {
  accessToken: string;
  emitterId: string;
  engineerId: string;
  carId: string;
  activatedAt: string;
}

export interface AuthenticationState {
  authData?: EmitterAuthData;
}

const initialState: AuthenticationState = {
  authData: undefined,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<EmitterAuthData>) => {
      state.authData = action.payload;
    },
  },
});

export default authenticationSlice.reducer;

export const { setAuthData } = authenticationSlice.actions;
