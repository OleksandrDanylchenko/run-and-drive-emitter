import { useCallback, useEffect, useRef, useState } from 'react';

interface LocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  throttle?: number;
}

export const useLocation = (
  options: LocationOptions,
): [coords: GeolocationCoordinates | null, error: GeolocationPositionError | null] => {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  const lastUpdateAtRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  const onChange = useCallback(
    ({ coords }: { coords: GeolocationCoordinates }) => {
      const now = Date.now();
      const { current: lastCall } = lastUpdateAtRef;
      const { current: timeoutId } = timeoutIdRef;
      const { throttle } = options;

      // The previous deferred update isn't finished yet
      if (timeoutId) return;

      const updateCoords = () =>
        setCoords({
          accuracy: coords.accuracy,
          altitude: coords.altitude,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          latitude: coords.latitude,
          longitude: coords.longitude,
          speed: coords.speed,
        });

      if (!throttle || !lastCall || now - lastCall > throttle) {
        lastUpdateAtRef.current = now;
        updateCoords();
        return;
      }

      const timeout = throttle - (now - lastCall);
      timeoutIdRef.current = setTimeout(() => {
        lastUpdateAtRef.current = Date.now();
        updateCoords();
        timeoutIdRef.current = null;
      }, timeout);
    },
    [options.throttle],
  );

  const onError = (error: GeolocationPositionError) => setError(error);

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError({
        PERMISSION_DENIED: 0,
        POSITION_UNAVAILABLE: 1,
        TIMEOUT: 0,
        code: 0,
        message: 'Geolocation is not supported',
      });
      return;
    }
    const watcher = geo.watchPosition(onChange, onError, {
      enableHighAccuracy: true,
      timeout: 100000,
      maximumAge: 90000,
      ...options,
    });
    return () => geo.clearWatch(watcher);
  }, [onChange, options]);

  return [coords, error];
};
