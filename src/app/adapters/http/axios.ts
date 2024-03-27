import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { ApiResponse } from 'app/types/api-status';
import { getResponseHeader, handleResponseError } from './utils';

export interface AxiosHttpRequestConfig extends AxiosRequestConfig {}

/**
 * The AxiosHttp singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class AxiosHttp {
  /**
   * Class instance
   */
  private static instance: AxiosHttp | null = null;

  /**
   * `AbortController` class instance
   */
  private static abortRequestController: AbortController;

  /**
   * Axios http client instance
   */
  private axiosHttpClientInstance: AxiosInstance | null = null;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    // Intentionally empty
  }

  /**
   * Handling server error response.
   * @param error Error information.
   */
  // eslint-disable-next-line class-methods-use-this
  private handleServerResponseError(error: unknown) {
    const responseError = handleResponseError(error);

    // If session expires, redirect the user to the main page.
    if (responseError.status === 404) {
      window.location.href = '/';
    }

    return Promise.reject(responseError);
  }

  /**
   * Initialize axios http client instance
   * @returns AxiosInstance
   */
  private initAxiosHttpClient() {
    // Create axios-http instance
    const http = axios.create({
      baseURL:
        process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : '/',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    // Handles any changes of the request before sending it to the API.
    http.interceptors.request.use(
      (request) => {
        if (window.location.hash.split('/')[1] === 'push-data') {
          return request;
        }

        const xClientIdentifier = localStorage.getItem('xClientIdentifier');
        if (xClientIdentifier) {
          request.headers['X-Client-Identifier'] =
            `VT-Portal;${xClientIdentifier}`;
        }

        const accessToken = localStorage.getItem('token');
        if (accessToken) {
          request.headers.Authorization = `Bearer ${accessToken}`;
        }

        return request;
      },
      (error: unknown) => this.handleServerResponseError(error),
    );

    // Globally handle the response data/error gracefully.
    http.interceptors.response.use(
      (response) => response,
      (error: unknown) => this.handleServerResponseError(error),
    );

    this.axiosHttpClientInstance = http;
    return http;
  }

  /**
   * Returns axios http client instance if already exist, otherwise create a new one.
   */
  private get http(): AxiosInstance {
    return this.axiosHttpClientInstance !== null
      ? this.axiosHttpClientInstance
      : this.initAxiosHttpClient();
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the AxiosHttp class while keeping
   * just one instance of each subclass around.
   *
   * @returns AxiosHttp class instance
   */
  static getInstance(): AxiosHttp {
    if (!AxiosHttp.instance) {
      AxiosHttp.instance = new AxiosHttp();
    }

    return AxiosHttp.instance;
  }

  /**
   * Return `true` if the error was due to a cancellation of request, otherwise `false`.
   * @param error Axios error.
   */
  public axiosIsCancel(error: AxiosError) {
    return axios.isCancel(error);
  }

  /**
   * Mechanism to abort on-going.
   */
  public abortRequest(): void {
    AxiosHttp.abortRequestController.abort();
  }

  /**
   * Sends a request to the server.
   * @param config Axios config
   * @returns Promise
   */
  public async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    // Initialize `AbortController` class
    AxiosHttp.abortRequestController = new AbortController();

    const response = await this.http.request<T>({
      ...config,
      signal: AxiosHttp.abortRequestController.signal,
    });
    const responseHeader = getResponseHeader(response);

    const result: ApiResponse<T> = {
      url: config.url || '',
      status: response.status,
      statusText: response.statusText,
      header: responseHeader,
      body: response.data,
    };

    return result;
  }

  /**
   * Sends `GET` request to the server.
   * @param url API endpoint url
   * @param config Axios config
   * @returns Promise
   */
  public async get<T = unknown>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<ApiResponse<T>> {
    // Initialize `AbortController` class
    AxiosHttp.abortRequestController = new AbortController();

    const response = await this.http.get<T>(url, {
      ...config,
      signal: AxiosHttp.abortRequestController.signal,
    });
    const responseHeader = getResponseHeader(response);

    const result: ApiResponse<T> = {
      url,
      status: response.status,
      statusText: response.statusText,
      header: responseHeader,
      body: response.data,
    };

    return result;
  }

  /**
   * Sends `PATCH` request to the server.
   * @param url API endpoint url
   * @param body Request payload
   * @param config Axios config
   * @returns Promise
   */
  public async patch<T>(
    url: string,
    body: unknown,
    config: AxiosRequestConfig = {},
  ): Promise<ApiResponse<T>> {
    // Initialize `AbortController` class
    AxiosHttp.abortRequestController = new AbortController();

    const response = await this.http.patch<T>(url, body, {
      ...config,
      signal: AxiosHttp.abortRequestController.signal,
    });
    const responseHeader = getResponseHeader(response);

    const result: ApiResponse<T> = {
      url,
      status: response.status,
      statusText: response.statusText,
      header: responseHeader,
      body: response.data,
    };

    return result;
  }

  /**
   * Sends `POST` request to the server.
   * @param url API endpoint url
   * @param body Request payload
   * @param config Axios config
   * @returns Promise
   */
  public async post<T>(
    url: string,
    body: unknown,
    config: AxiosRequestConfig = {},
  ): Promise<ApiResponse<T>> {
    // Initialize `AbortController` class
    AxiosHttp.abortRequestController = new AbortController();

    const response = await this.http.post<T>(url, body, {
      ...config,
      signal: AxiosHttp.abortRequestController.signal,
    });
    const responseHeader = getResponseHeader(response);

    const result: ApiResponse<T> = {
      url,
      status: response.status,
      statusText: response.statusText,
      header: responseHeader,
      body: response.data,
    };

    return result;
  }

  /**
   * Sends `PUT` request to the server.
   * @param url API endpoint url
   * @param body Request payload
   * @param config Axios config
   * @returns Promise
   */
  public async put<T = unknown>(
    url: string,
    body: unknown,
    config: AxiosRequestConfig = {},
  ): Promise<ApiResponse<T>> {
    // Initialize `AbortController` class
    AxiosHttp.abortRequestController = new AbortController();

    const response = await this.http.put<T>(url, body, {
      ...config,
      signal: AxiosHttp.abortRequestController.signal,
    });
    const responseHeader = getResponseHeader(response);

    const result: ApiResponse<T> = {
      url,
      status: response.status,
      statusText: response.statusText,
      header: responseHeader,
      body: response.data,
    };

    return result;
  }

  /**
   * Sends `DELETE` request to the server.
   * @param url API endpoint url
   * @param config Axios config
   * @returns Promise
   */
  public async delete<T>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<ApiResponse<T>> {
    // Initialize `AbortController` class
    AxiosHttp.abortRequestController = new AbortController();

    const response = await this.http.delete<T>(url, {
      ...config,
      signal: AxiosHttp.abortRequestController.signal,
    });
    const responseHeader = getResponseHeader(response);

    const result: ApiResponse<T> = {
      url,
      status: response.status,
      statusText: response.statusText,
      header: responseHeader,
      body: response.data,
    };

    return result;
  }
}

export const http = AxiosHttp.getInstance();
