import { ActiveTrip, GetTestTripDto, TestTripSummary } from '@models/api';
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
    getTestTripById: build.query<GetTestTripDto, string>({
      query: (tripId) => ({
        url: API.TEST_TRIP_BY_ID(tripId),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetActiveTripQuery, useGetTestTripsQuery, useGetTestTripByIdQuery } =
  tripsApi;
