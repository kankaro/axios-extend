import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { Users } from 'app/services/api/models/Users';
import { RootState } from 'store/store';
import { userState } from './userState';

export const userSlice = createSlice({
  name: 'users',
  initialState: userState,
  reducers: {
    setUsers: (state, action: PayloadAction<Array<Users>>) => {
      state.users = action.payload;
    },
    setDataFetchRequestPendingTo: (state, action: PayloadAction<boolean>) => {
      state.isDataFetchRequestPending = action.payload;
    },
  },
});

/* ------- ACTION CREATORS ------- */
export const { actions: userActions } = userSlice;

/* ------- STATE SELECTORS ------- */
export const selectUserState = (state: RootState) => state.users || userState;

export const makeSelectUsers = () =>
  createSelector(selectUserState, (state) => state.users);

export const makeSelectDataFetchRequestPending = () =>
  createSelector(selectUserState, (state) => state.isDataFetchRequestPending);

export default userSlice.reducer;
