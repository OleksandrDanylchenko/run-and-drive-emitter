import { RegisterPayload } from '@models/api';
import { publicEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';
import { EmitterAuthData } from '@redux/slices/authenticationSlice';

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
