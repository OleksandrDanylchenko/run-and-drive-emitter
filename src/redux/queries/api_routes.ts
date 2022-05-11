export const API = {
  REGISTER: `/emitters/register`,
  UNREGISTER: `/emitters/unregister`,
  ACTIVE_TRIP: `/emitters/active-trip`,
  GET_CAR_BY_ID: (carId: string) => `/cars/${carId}`,
};
