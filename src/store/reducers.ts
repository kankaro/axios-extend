/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import userReducer from 'app/pages/Users/slice/userSlice';

export function createReducer() {
  return combineReducers({
    users: userReducer,
  });
}
