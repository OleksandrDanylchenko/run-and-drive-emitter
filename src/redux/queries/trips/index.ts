/* eslint-disable import/no-cycle */

import { Trip } from 'run-and-drive-lib/models';

import { ChangeResponseDto, CreateTripDto, TestTrip, TestTripSummary } from '@models/api';
import { startEmitting, stopEmitting } from '@redux/actions/emitting_actions';
import { protectedEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

export const tripsApi = protectedEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveTrip: build.query<Trip | null, void>({
      query: () => ({
        url: API.ACTIVE_TRIP,
      }),
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
      keepUnusedDataFor: 0,
    }),
    startTrip: build.mutation<ChangeResponseDto, CreateTripDto>({
      query: (payload) => ({
        url: API.START_TRIP,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(startEmitting());
      },
    }),
    endTrip: build.mutation<ChangeResponseDto, { tripId: string }>({
      query: ({ tripId }) => ({
        url: API.END_TRIP(tripId),
        method: 'PATCH',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(stopEmitting());
        await queryFulfilled;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetActiveTripQuery,
  useGetTestTripsQuery,
  useGetTestTripByIdQuery,
  useStartTripMutation,
  useEndTripMutation,
} = tripsApi;
