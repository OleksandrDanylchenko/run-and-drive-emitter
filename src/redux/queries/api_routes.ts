export const API = {
  REGISTER: `/emitters/register`,
  DEACTIVATE: `/emitters/deactivate`,
  ACTIVE_TRIP: `/emitters/active-trip`,
  GET_CAR_BY_ID: (carId: string) => `/cars/${carId}`,
  GET_ENGINEER_BY_ID: (engineerId: string) => `/engineers/${engineerId}`,
  CREATE_SENSORS_RECORD: `/sensors/record`,
};
