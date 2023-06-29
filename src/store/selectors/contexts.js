// src/redux/selectors/contexts.js

import { createSelector } from '@reduxjs/toolkit';

// This is a simple selector that returns all the game data.
export const selectAllContextData = (state) => state.contexts.contexts;

// This selector takes a game id as an argument and returns the context data for that id.
export const selectContextData = createSelector(
  [selectAllContextData, (_, gameId) => gameId],
  (contexts, gameId) => {
    const universe = contexts.universe.find((ctx) => ctx.gameId === gameId)
    if(!universe) return { universe: {}, subdivisions: [], features: []};
    const subdivisions = contexts.subdivisions && contexts.subdivisions.filter((ctx) => ctx.universeId === universe.id) || [];
    const features = contexts.features && contexts.features.filter((ctx) => ctx.universeId === universe.id) || [];
    return { universe, subdivisions, features }
  }
);

// This selector takes a game id as an argument and returns the context data for that id.
export const selectCampaignWorlds = createSelector(
  [selectAllContextData, (_, gameId) => gameId],
  (contexts, gameId) => {
    if(!gameId || !contexts.universe || !contexts.universe.length) return [];
    const universe = contexts.universe.find((ctx) => ctx.gameId === gameId) 
    if(!universe) return [];
    const subdivisions = contexts.subdivisions && contexts.subdivisions.filter((ctx) => ctx.universeId === universe.id && (ctx.scale && ctx.scale.toLowerCase() === 'world')) || [];
    return subdivisions
  }
);

// This selector takes a game id as an argument and returns the context data for that id.
export const selectSubdivision = createSelector(
  [selectAllContextData, (_, subId) => subId],
  (contexts, subId) => {
    if(!subId || !contexts.subdivisions || !contexts.subdivisions.length) return [];
    const subdivision = contexts.subdivisions.find((ctx) => ctx.id === subId) 
    return subdivision
  }
);


export const selectLowerDivisions = createSelector(
  [selectAllContextData, (_, subId) => subId],
  (contexts, subId) => {
    if(!subId || !contexts.subdivisions || !contexts.subdivisions.length) return [];
    const subdivisions = contexts.subdivisions.filter((ctx) => ctx.superId === subId) 
    return subdivisions
  }
);