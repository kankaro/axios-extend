import { useEffect } from 'react';

import { UsersService } from 'app/services/api/UsersService';

import { onHandleApiErrorResponse } from 'app/utils/errorHandler';

import { useUserDispatcher } from './useUserDispatcher';

export function useUserDataFetch() {
  const { dispatchSetUsers, dispatchSetDataFetchRequestPendingTo } =
    useUserDispatcher();
  async function initializeDataFetch() {
    try {
      dispatchSetDataFetchRequestPendingTo(true);
      const { body: users } = await UsersService.getUsers();

      dispatchSetUsers(users);
    } catch (error) {
      onHandleApiErrorResponse(error);
    } finally {
      dispatchSetDataFetchRequestPendingTo(false);
    }
  }

  // Kick off data fetch
  useEffect(() => {
    initializeDataFetch();
  }, []);
}
