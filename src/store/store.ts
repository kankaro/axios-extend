import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createReducer } from './reducers';

export const store = configureStore({
  reducer: createReducer(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
