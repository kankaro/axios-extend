import { ToastOptions, toast } from 'react-toastify';

/**
 * Toggle toast notification message.
 * @param message Message to display in the notification.
 * @param options Toast notification option.
 * @returns
 */
export function notify(message: string, options?: ToastOptions) {
  return toast(message, options);
}

notify.info = (message: string, options?: ToastOptions) =>
  toast.info(message, options);

notify.error = (message: string, options?: ToastOptions) =>
  toast.error(message, options);

notify.warn = (message: string, options?: ToastOptions) =>
  toast.warn(message, options);

notify.success = (message: string, options?: ToastOptions) =>
  toast.success(message, options);

notify.loading = (message: string, options?: ToastOptions) =>
  toast.loading(message, options);

notify.dismiss = (toastId: string | number) => {
  toast.dismiss(toastId);
};
