import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponseError } from 'app/types/api-status';

/**
 * Determine if a given value is of type `Blob`.
 * @param value Mix data type.
 * @returns boolean
 */
export function isBlob(value: unknown) {
  return value instanceof Blob;
}

/**
 * Determine if the given value is a string type.
 * @param value Mix data types
 * @returns boolean
 */
export function isString(value: unknown) {
  return typeof value === 'string';
}

/**
 * Determine if the given value is not a `null` or `undefined`.
 * @param value It can be a generic, a null or undefined.
 * @returns boolean.
 */
export function isDefined(value: unknown) {
  return value !== undefined && value !== null;
}

/**
 * Returns a constructed form data.
 * @param params Object data source.
 * @returns Form data.
 */
export function getFormData(params: Record<string, string | Blob>) {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (isDefined(value)) {
      formData.append(key, value);
    }
  });

  return formData;
}

/**
 * Determine if the given value is a string but excludes an empty string.
 * @param value Mix data type.
 * @returns boolean
 */
export function isStringWithValue(value: unknown) {
  return isString(value) && value !== '';
}

/**
 * Returns the server's response header.
 * @param response A plain object of axios response.
 * @returns Response headers.
 */
export function getResponseHeader(response: AxiosResponse) {
  const headers: { [key: string]: string | number } = {};

  Object.keys(response.headers).forEach((key) => {
    if (key === 'x-total-count') {
      headers[key] = parseInt(response.headers[key], 10);
    } else {
      headers[key] = response.headers[key];
    }
  });

  return headers;
}

/**
 * --------------------------------------------------------------------
 * Handles server error response
 * --------------------------------------------------------------------
 */

type ErrorWithMessage = {
  message: string;
};

/**
 * Credits to Kent C. Dodds and the other two persons who suggest `Nicholas` and `Jesse`, the universal way of handling an error in Javascript.
 * Source: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 */
/**
 * Determine if a certain error contains a `message` string.
 * @param error An `Error` of which its type is not yet determine.
 * @returns Type guard.
 */
export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

/**
 * An adapter like method to handle thrown errors that might not fit all cases, since many
 * framework are throwing errors that comply to the Error api, but aren't instance of Error.
 * @param error An `Error` of which its type is not yet determine.
 * @returns Error message.
 */
function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) {
    return maybeError;
  }

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

/**
 * Returns an error message gracefully.
 * @param error An `Error` of which its type is not yet determine.
 * @returns Error message.
 */
export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

/**
 * Returns a name representation of the server response status code.
 * @param statusCode Server response status code.
 */
export function onHandleResponseErrorStatusCode(statusCode: number): string {
  const errors: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
  };

  return errors[statusCode];
}

/**
 * Parses server error response.
 * @param error Information about the error.
 * @returns
 */
export function handleResponseError(error: unknown): ApiResponseError {
  if (error instanceof TypeError) {
    return {
      status: 1000,
      statusText: 'TypeError',
      message: error,
    };
  }

  if (error instanceof AxiosError) {
    if (error.response) {
      let message = error.message;
      const statusName = onHandleResponseErrorStatusCode(error.response.status);

      if (statusName === 'Conflict') {
        message =
          'There was a request conflict with the current state of the target resource';
      }

      // To have a graceful termination for rules api 401s
      if (statusName === 'Unauthorized') {
        message = `${statusName} credential`;
        window.localStorage.removeItem('token');
      } else if (statusName === 'Gateway Timeout') {
        message = statusName;
      } else if (
        statusName === 'Internal Server Error' &&
        Object.prototype.hasOwnProperty.call(error.response.data, 'message')
      ) {
        message = error.response.data.message;
      }

      return {
        status: error.response.status,
        statusText: error.response.statusText,
        message,
      };
    }

    if (error.request) {
      return {
        status: error.request.status,
        statusText: error.request.statusText,
        message: error.message,
      };
    }

    return {
      status: 1001,
      statusText: 'Error',
      message: getErrorMessage(error),
    };
  }

  return {
    status: 1002,
    statusText: 'Error',
    message: getErrorMessage(error),
  };
}
