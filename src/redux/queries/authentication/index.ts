import { RegisterPayload } from '@models/api';
import { publicEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

import type { EmitterAuthData } from '@redux/slices/authentication_slice';

export const authenticationApi = publicEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<EmitterAuthData, RegisterPayload>({
      query: (payload) => ({
        url: API.REGISTER,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation } = authenticationApi;
