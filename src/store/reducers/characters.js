// src/store/reducers/characters.js

import { createSlice } from '@reduxjs/toolkit';
import {
  createAssoc, changeCharacteristic, updateCurrentTerm, updateLifePath, fetchCharacters, updatePortraitSrc, fetchCharacter, createPortrait, fetchControlledCharacters, fetchModels, fetchModelData, addModel, fetchAssocData, fetchModelContext, fetchUniverseSubdivisions
} from '../actions/models';
import { HYDRATE } from "next-redux-wrapper";
import { mergeIntoArray, mergeArrays } from '../../utils/storeMethods';

const initialState = {
  characters: [],
  portraits: [],
  lifePaths: [],
  error: null,
};

const updateCharactersWithLifePaths = (characters, lifePaths) => {
  const updatedCharacters = characters.map((character) => {
    const paths = lifePaths.filter((lp) => lp.ownerId === character.id);
    if(paths.length){
      character.lifePaths = paths
    }
    return character;
  });
  return updatedCharacters;
}

const contextsSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createAssoc.fulfilled, (state, action) => {
      const character  = action.payload;
      const mergedChar = mergeIntoArray(state.characters, character);
      state.characters = mergedChar;
      state.error = null;
      
    })
    .addCase(changeCharacteristic.fulfilled, (state, action) => {
      const mergedChar = mergeIntoArray(state.characters, action.payload);
      state.characters = mergedChar;
      state.error = null;
      
    })
    .addCase(updateCurrentTerm.fulfilled, (state, action) => {
      const mergedPort = mergeIntoArray(state.lifePaths, action.payload);
      state.lifePaths = mergedPort;
      const mergedChar = updateCharactersWithLifePaths(state.characters, mergedPort);
      state.characters = mergedChar;
      state.error = null;
      
    })
    .addCase(updateLifePath.fulfilled, (state, action) => {
      const mergedPort = mergeArrays(state.lifePaths, action.payload);
      state.lifePaths = mergedPort;
      const mergedChar = updateCharactersWithLifePaths(state.characters, mergedPort);
      state.characters = mergedChar;
      state.error = null;
      
    })
    .addCase(updatePortraitSrc.fulfilled, (state, action) => {
      const portrait = action.payload;
      const mergedPort = mergeIntoArray(state.portraits, portrait);
      state.portraits = mergedPort;
      state.error = null;
      
    })
    .addCase(createPortrait.fulfilled, (state, action) => {
      const { portrait, character } = action.payload;
      const mergedChar = mergeIntoArray(state.characters, character);
      state.characters = mergedChar;
      const mergedPort = mergeIntoArray(state.portraits, portrait);
      state.portraits = mergedPort;
      state.error = null;
      
    })
    .addCase(addModel.fulfilled, (state, action) => {
      if(action.meta.arg.modelName === 'pdf' || action.meta.arg.modelName === 'cc' || action.meta.arg.modelName === 'ss'){

        state.characters = [action.payload, ...state.characters ];
        const uniqueCharacters = state.characters.filter((character, index, self) =>
          index === self.findIndex((t) => (
            t.id === character.id
          ))
        )
        state.characters = uniqueCharacters;
        state.error = null;
      } else if(action.meta.arg.modelName === 'lp'){
        const { lifePaths, character } = action.payload;
        character.lifePaths = lifePaths;
        const mergedChar = mergeIntoArray(state.characters, character);
        state.characters = mergedChar;
        const mergedPort = mergeArrays(state.lifePaths, lifePaths);
        state.lifePaths = mergedPort;
        state.error = null;
      }
    })
    .addCase(fetchCharacter.fulfilled, (state, action) => {
      const { portraits, characters } = action.payload;

      //console.log('fetchCharacter.fulfilled action', action, JSON.parse(JSON.stringify(state)));
        state.characters = mergeArrays(state.characters, characters);
        state.portraits = mergeArrays(state.portraits, portraits);
        state.error = null;
      
    })
    .addCase(fetchControlledCharacters.fulfilled, (state, action) => {
      const { portraits, characters } = action.payload;

      //console.log('fetchControlledCharacters.fulfilled action', action, JSON.parse(JSON.stringify(state)));
        state.characters = mergeArrays(state.characters, characters);
        state.portraits = mergeArrays(state.portraits, portraits);
        state.error = null;
      
    })
    .addCase(fetchCharacters.fulfilled, (state, action) => {
      const { portraits, characters } = action.payload;

      //console.log('fetchCharacters.fulfilled action', action, JSON.parse(JSON.stringify(characters)));
        state.characters = mergeArrays(state.characters, characters);
        state.portraits = mergeArrays(state.portraits, portraits);
        state.error = null;
      
    })
    .addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.games,
      };
    })
  },
});

export default contextsSlice.reducer;
