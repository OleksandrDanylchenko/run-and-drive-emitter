import { API_HOST } from '@constants/index';
import { history } from '@navigation/Routing';
import { RootState } from '@redux/store';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: API_HOST,
  prepareHeaders: (headers, { getState }) => {
    const { authData } = (getState() as RootState).authentication;
    if (authData?.accessToken) {
      headers.set('Authorization', `Bearer ${authData.accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithAuthCheck: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const { authData } = state.authentication;
  if (!authData?.accessToken) {
    console.error(
      'Access token is missing!',
      `Failed on request to ${JSON.stringify(args, null, 2)}`,
    );
    history.replace('/error/token-missing');
  }

  return baseQuery(args, api, extraOptions);
};

export const publicEmitterApi = createApi({
  reducerPath: 'publicEmitterApi',
  baseQuery,
  endpoints: () => ({}),
});

export const protectedEmitterApi = createApi({
  reducerPath: 'protectedEmitterApi',
  baseQuery: baseQueryWithAuthCheck,
  endpoints: () => ({}),
});
