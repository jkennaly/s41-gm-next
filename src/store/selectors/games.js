// src/redux/selectors/games.js

import { createSelector } from '@reduxjs/toolkit';

// This is a simple selector that returns all the game data.
export const selectAllGameData = (state) => state.games.games;

// This selector takes a game id as an argument and returns the game data for that id.
export const selectGameData = createSelector(
  [selectAllGameData, (_, gameId) => gameId],
  (games, gameId) => games.find((game) => game.id === gameId)
);
