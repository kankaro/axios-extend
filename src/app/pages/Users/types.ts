import { Users } from 'app/services/api/models/Users';

export type UserState = {
  // Data source
  users: Array<Users>;

  // Request status
  isDataFetchRequestPending: boolean;
};
