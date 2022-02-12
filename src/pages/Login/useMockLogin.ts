import { LoginForm } from '@pages/Login/index';
import { useState } from 'react';

const defaultErrors = 'Login is banned in the system';

export const useMockLogin = (): [isLoading: boolean, onSubmit: any, error: any] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (form: LoginForm) => {
    console.log(form);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setError(defaultErrors);
    }, 200);
  };

  return [isLoading, onSubmit, error];
};
