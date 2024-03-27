import { ApiResponseError } from 'app/types/api-status';

import { notify } from './toaster';

/**
 * Parsing API response error.
 * @param error Server response error.
 */
export function parseApiResponseError(error: unknown) {
  const err = error as ApiResponseError;
  return err;
}

/**
 * Handling server error response.
 * @param error Server response status code.
 */
export function onHandleApiErrorResponse(error: unknown) {
  const err = parseApiResponseError(error);

  if (err.status === 401) {
    const toastId = notify.warn('Session expired', {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
    setTimeout(() => {
      notify.dismiss(toastId);
    }, 2000);
  } else if ([500, 504].includes(err.status)) {
    console.log('Server error:', err);
    notify.error(err.message.toString());
    // Request cancellation
  } else if (err.message === 'canceled') {
    console.info('Request was canceled');
  } else {
    console.log('Other error:', err);
    notify.info(err.message.toString());
  }
}
