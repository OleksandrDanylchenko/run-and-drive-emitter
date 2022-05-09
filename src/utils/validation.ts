import * as yup from 'yup';

export const activationLoginSchema = yup
  .string()
  .length(8, 'Login should contain 8 characters')
  .required();

export const carActivationCodeSchema = yup
  .string()
  .length(8, 'Car code should contain 8 characters')
  .required();

export const passwordSchema = yup
  .string()
  .min(8, 'Password should container at least 8 characters')
  .required();
