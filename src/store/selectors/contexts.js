// src/redux/selectors/contexts.js

import { createSelector } from '@reduxjs/toolkit';

// This is a simple selector that returns all the game data.
export const selectAllContextData = (state) => state.contexts.contexts;

// This selector takes a game id as an argument and returns the context data for that id.
export const selectContextData = createSelector(
  [selectAllContextData, (_, gameId) => gameId],
  (contexts, gameId) => {
    const universe = contexts.universe.find((ctx) => ctx.gameId === gameId)
    const subdivisions = contexts.subdivisions && contexts.subdivisions.filter((ctx) => ctx.universeId === universe.id) || [];
    const features = contexts.features && contexts.features.filter((ctx) => ctx.universeId === universe.id) || [];
    return { universe, subdivisions, features }
  }
);

// This selector takes a game id as an argument and returns the context data for that id.
export const selectCampaignWorlds = createSelector(
  [selectAllContextData, (_, gameId) => gameId],
  (contexts, gameId) => {
    console.log('selectCampaignWorlds contexts', gameId, contexts);
    if(!gameId || !contexts.universe || !contexts.universe.length) return [];
    const universe = contexts.universe.find((ctx) => ctx.gameId === gameId)
    const subdivisions = contexts.subdivisions && contexts.subdivisions.filter((ctx) => ctx.universeId === universe.id && (ctx.scale && ctx.scale.toLowerCase() === 'world')) || [];
    return subdivisions
  }
);
