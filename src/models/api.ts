export interface RegisterPayload {
  activationLogin: string;
  carActivationCode: string;
  password: string;
}

export interface ActiveTrip {
  id: string;
  startTime: string;
}
