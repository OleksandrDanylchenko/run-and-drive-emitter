import { Engineer } from 'run-and-drive-lib/models';

import { protectedEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

export const engineersApi = protectedEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    getEngineerById: build.query<Engineer, string>({
      query: (carId) => ({
        url: API.GET_ENGINEER_BY_ID(carId),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetEngineerByIdQuery } = engineersApi;
