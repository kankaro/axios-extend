import { useAppDispatch } from 'store/hooks';
import { userActions } from 'app/pages/Users/slice/userSlice';
import { Users } from 'app/services/api/models/Users';

export function useUserDispatcher() {
  const dispatch = useAppDispatch();

  function dispatchSetUsers(users: Array<Users>) {
    dispatch(userActions.setUsers(users));
  }

  function dispatchSetDataFetchRequestPendingTo(
    isDataFetchRequestPending: boolean,
  ) {
    dispatch(
      userActions.setDataFetchRequestPendingTo(isDataFetchRequestPending),
    );
  }

  return Object.freeze({
    dispatchSetUsers,
    dispatchSetDataFetchRequestPendingTo,
  });
}
