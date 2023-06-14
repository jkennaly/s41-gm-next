// src/store/reducers/characters.js

import { createSlice } from '@reduxjs/toolkit';
import {
  updatePortraitSrc, fetchCharacter, createPortrait, fetchControlledCharacters, fetchModels, fetchModelData, addModel, fetchAssocData, fetchModelContext, fetchUniverseSubdivisions
} from '../actions/models';
import { HYDRATE } from "next-redux-wrapper";
import { mergeIntoArray, mergeArrays } from '../../utils/storeMethods';

const initialState = {
  characters: [],
  portraits: [],
  error: null,
};

const contextsSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      if(action.meta.arg.modelName === 'pdf' || action.meta.arg.modelName === 'cc'){

        state.characters = [action.payload, ...state.characters ];
        const uniqueCharacters = state.characters.filter((character, index, self) =>
          index === self.findIndex((t) => (
            t.id === character.id
          ))
        )
        state.characters = uniqueCharacters;
        state.error = null;
      }
    })
    .addCase(fetchCharacter.fulfilled, (state, action) => {
      const { portraits, characters } = action.payload;

      console.log('fetchCharacter.fulfilled action', action, JSON.parse(JSON.stringify(state)));
        state.characters = mergeArrays(state.characters, characters);
        state.portraits = mergeArrays(state.portraits, portraits);
        state.error = null;
      
    })
    .addCase(fetchControlledCharacters.fulfilled, (state, action) => {
      const { portraits, characters } = action.payload;

      console.log('fetchControlledCharacters.fulfilled action', action, JSON.parse(JSON.stringify(state)));
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
