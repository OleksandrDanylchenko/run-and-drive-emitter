import { LoginForm } from '@pages/Login/index';
import { useState } from 'react';

export const useMockLogin = (): [isLoading: boolean, onSubmit: any] => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (form: LoginForm) => {
    console.log(form);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return [isLoading, onSubmit];
};
