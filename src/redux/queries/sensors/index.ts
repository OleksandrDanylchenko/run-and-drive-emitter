import { SensorsRecord } from 'run-and-drive-lib/models';

import { protectedEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

export const sensorsApi = protectedEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    createRecord: build.mutation<{ id: string }, SensorsRecord>({
      query: (payload) => ({
        url: API.CREATE_SENSORS_RECORD,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateRecordMutation } = sensorsApi;
