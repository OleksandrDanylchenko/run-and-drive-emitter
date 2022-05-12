import { ActiveTrip, TestTrip, TestTripSummary } from '@models/api';
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
    getTestTrips: build.query<TestTripSummary[] | null, void>({
      query: () => ({
        url: API.TEST_TRIPS,
      }),
    }),
    getTestTripById: build.query<TestTrip, string>({
      query: (tripId) => ({
        url: API.TEST_TRIP_BY_ID(tripId),
      }),
      keepUnusedDataFor: 5,
    }),
  }),
  overrideExisting: false,
});

export const { useGetActiveTripQuery, useGetTestTripsQuery, useGetTestTripByIdQuery } =
  tripsApi;
