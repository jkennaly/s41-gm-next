// src/store/reducers/games.js

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchModels, fetchModelData, addModel, fetchAssocData 
} from '../actions/models';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  games: [],
  error: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAssocData.fulfilled, (state, action) => {
      if(action.meta.arg.modelName === 'games'){
        const games = state.games.length ? state.games.map((game) => {
          if(game.id === action.payload.id){
            return action.payload;
          }
          return game;
        }) : [action.payload];
        state.games = games;
        state.error = null;
      }
    })
      .addCase(fetchAssocData.rejected, (state, action) => {
        if(action.meta.arg.modelName === 'games'){
        state.error = action.payload;
      }
      })
      .addCase(fetchModelData.fulfilled, (state, action) => {
        if(action.meta.arg === 'games'){
          const games = state.games.games.map((game) => {
            if(game.id === action.payload.id){
              return action.payload;
            }
            return game;
          });
          state.games.games = games;
          state.error = null;
        }
      })
        .addCase(fetchModelData.rejected, (state, action) => {
          if(action.meta.arg === 'games'){
          state.error = action.payload;
        }
        })
      .addCase(fetchModels.fulfilled, (state, action) => {
        if(action.meta.arg === 'games'){
          state.games = action.payload;
          state.error = null;
        }
      })
        .addCase(fetchModels.rejected, (state, action) => {
          if(action.meta.arg === 'games'){
          state.games = [];
          state.error = action.payload;
        }
        })
      .addCase(addModel.fulfilled, (state, action) => {
        if(action.meta.arg === 'games'){
        state.games.push(action.payload);
        state.error = null;
      }
      })
      .addCase(addModel.rejected, (state, action) => {
        if(action.meta.arg === 'games'){
        state.error = action.payload;
      }
      })
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.games,
        };
      })
  },
});

export default gamesSlice.reducer;
