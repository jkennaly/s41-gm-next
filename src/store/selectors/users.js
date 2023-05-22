// src/redux/selectors/users.js

import { createSelector } from '@reduxjs/toolkit';

// This is a simple selector that returns all the game data.
export const selectAllUserData = (state) => state.users.users;

// This selector takes a user id as an argument and returns the user data for that id.
export const selectUserData = createSelector(
  [selectAllUserData, (_, userId) => userId],
  (users, userId) => users.find((user) => user.id === userId)
);
