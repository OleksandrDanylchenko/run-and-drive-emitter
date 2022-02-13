import * as yup from 'yup';

export const loginSchema = yup
  .string()
  .length(6, 'Login should contain 6 characters')
  .required();

export const passwordSchema = yup
  .string()
  .min(8, 'Password should container at least 8 characters')
  .required();
