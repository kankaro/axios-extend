import { useAppSelector } from 'store/hooks';

import {
  makeSelectDataFetchRequestPending,
  makeSelectUsers,
} from 'app/pages/Users/slice/userSlice';

export function useUserSelector() {
  const users = useAppSelector(makeSelectUsers());
  const isDataFetchRequestPending = useAppSelector(
    makeSelectDataFetchRequestPending(),
  );

  return Object.freeze({ users, isDataFetchRequestPending });
}
