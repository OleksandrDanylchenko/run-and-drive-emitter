import { authenticationApi } from '@redux/queries/authentication';
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
  extraReducers: (builder) => {
    builder.addMatcher(
      authenticationApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.authData = payload;
      },
    );
  },
});

export default authenticationSlice.reducer;

export const { setAuthData } = authenticationSlice.actions;
