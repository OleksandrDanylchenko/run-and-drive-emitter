export interface ChangeResponseDto {
  id: string;
}

export interface RegisterPayload {
  activationLogin: string;
  carActivationCode: string;
  password: string;
}

export interface DeactivatePayload {
  password: string;
}

export interface ActiveTrip {
  id: string;
  startTime: string;
}

export interface TestTripSummary {
  id: string;
  name: string;
  startLocation: google.maps.LatLngLiteral;
  endLocation: google.maps.LatLngLiteral;
  totalDistance: number;
}

export interface TestTrip {
  id: string;
  name: string;
  locations: google.maps.LatLngLiteral[];
  totalDistance: number;
}

export interface CreateTripDto {
  userId: string;
  carId: string;
  location: Location;
}

export interface EndTripDto {
  location: Location;
}
