import { AxiosHttpRequestConfig, http } from 'app/adapters/http/axios';
import { Users } from './models/Users';

export class UsersService {
  /**
   * Get all users.
   * @returns Promise
   */
  static async getUsers() {
    const result = await http.get<Array<Users>>(`/api/users`);

    return result;
  }

  /**
   * Create user.
   * @param params Object data source.
   * @param params.requestBody Request payload.
   * @param params.requestConfig The available config options for making requests.
   * @returns Promise
   */
  static async createUser(params: {
    // Request payload
    requestBody: Array<Users>;
    /** The available config options for making requests. **/
    requestConfig?: AxiosHttpRequestConfig;
  }) {
    const result = await http.post<Array<Users>>(
      `/api/users`,
      params.requestBody,
      params.requestConfig,
    );

    return result;
  }

  /**
   * Abort current request
   */
  public static abortRequest() {
    http.abortRequest();
  }
}
