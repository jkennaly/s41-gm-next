// src/redux/selectors/characters.js

import { createSelector } from '@reduxjs/toolkit';

// This is a simple selector that returns all the game data.
export const selectAllCharacterData = (state) => state.characters.characters;
export const selectAllPortraitData = (state) => state.characters.portraits;

// This selector takes a game id as an argument and returns the context data for that id.
export const selectPC = createSelector(
  [selectAllCharacterData, (_, characterId) => characterId],
  (characters, characterId) => {
    const pc = characters.find((ctx) => ctx.id === characterId)
    return pc
  }
);

export const selectCharacter = createSelector(
  [selectAllCharacterData, (_, characterId) => characterId],
  (characters, characterId) => {
    const pc = characters.find((ctx) => ctx.id === characterId)
    return pc
  }
);

export const selectControlled = createSelector(
  [selectAllCharacterData, (_, ownerId) => ownerId],
  (characters, ownerId) => {
    if(!ownerId) return [];
    const controlled = characters.filter((ctx) => ctx.id === ownerId)
    return controlled
  }
);

export const selectPortrait = createSelector(
  [selectAllPortraitData, (_, portraitId) => portraitId],
  (portraits, portraitId) => {
    const portrait = portraits.find((ctx) => ctx.id === portraitId)
    return portrait
  }
);

export const selectPortraitForCharacter = createSelector(
  [selectAllCharacterData, selectAllPortraitData, (_, characterId) => characterId],
  (characters = [], portraits = [], characterId) => {
    const character = characters.find((ctx) => ctx.id === characterId)
    const pdf = character.personalDataFile || {}
    const portraitId = pdf.currentPortraitId || {}
    const portrait = portraits.find((ctx) => ctx.id === portraitId) || {}
    return portrait
  }
)

export const selectImgSrcForCharacter = createSelector(
  [selectAllCharacterData, selectAllPortraitData, (_, characterId) => characterId],
  (characters = [], portraits = [], characterId) => {
    const character = characters.find((ctx) => ctx.id === characterId)
    const pdf = character.personalDataFile || {}
    const portraitId = pdf.currentPortraitId || {}
    const portrait = portraits.find((ctx) => ctx.id === portraitId) || {}
    console.log('selectPortraitForCharacter', portrait, characters, portraits, characterId, character)
    return portrait.imageUrl
  }
)
