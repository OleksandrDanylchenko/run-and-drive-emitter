/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

// eslint-disable-next-line @typescript-eslint/ban-types
export const isEmpty = (value?: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const getErrorMessage = (
  error?: FetchBaseQueryError | SerializedError,
): string | undefined => {
  if (!error) return;
  if (!('status' in error)) return error.message;

  const messageData = error.data as { message: string };
  return `${error.status} ${messageData.message}`;
};

export * from './validation';
