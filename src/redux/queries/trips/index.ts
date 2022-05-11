import { ActiveTrip } from '@models/api';
import { protectedEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

export const tripsApi = protectedEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveTrip: build.query<ActiveTrip | null, void>({
      query: () => ({
        url: API.ACTIVE_TRIP,
      }),
      transformResponse: (baseQueryReturnValue, meta, arg) => {
        const { activeTrip } = baseQueryReturnValue as { activeTrip?: ActiveTrip };
        return !activeTrip ? null : activeTrip;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetActiveTripQuery } = tripsApi;
