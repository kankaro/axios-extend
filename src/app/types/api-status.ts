export type ApiResponse<T> = {
  url: string;
  status: number;
  statusText: string;
  header: { [key: string]: string | number };
  body: T;
};

export type ApiRequestStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';

export type ApiResponseError = {
  status: number;
  statusText: string;
  message: string | TypeError;
};
