// src/store/reducers/contexts.js

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchModels, fetchModelData, addModel, fetchAssocData 
} from '../actions/models';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  contexts: [],
  error: null,
};

const contextsSlice = createSlice({
  name: 'contexts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAssocData.fulfilled, (state, action) => {
      if(action.meta.arg.modelName === 'contexts'){
        const contexts = state.contexts.length ? state.contexts.map((game) => {
          if(game.id === action.payload.id){
            return action.payload;
          }
          return game;
        }) : [action.payload];
        state.contexts = contexts;
        state.error = null;
      }
    })
      .addCase(fetchAssocData.rejected, (state, action) => {
        if(action.meta.arg.modelName === 'contexts'){
        state.error = action.payload;
      }
      })
      .addCase(fetchModelData.fulfilled, (state, action) => {
        if(action.meta.arg === 'contexts'){
          const contexts = state.contexts.contexts.map((game) => {
            if(game.id === action.payload.id){
              return action.payload;
            }
            return game;
          });
          state.contexts.contexts = contexts;
          state.error = null;
        }
      })
        .addCase(fetchModelData.rejected, (state, action) => {
          if(action.meta.arg === 'contexts'){
          state.error = action.payload;
        }
        })
      .addCase(fetchModels.fulfilled, (state, action) => {
        if(action.meta.arg === 'contexts'){
          state.contexts = action.payload;
          state.error = null;
        }
      })
        .addCase(fetchModels.rejected, (state, action) => {
          if(action.meta.arg === 'contexts'){
          state.contexts = [];
          state.error = action.payload;
        }
        })
      .addCase(addModel.fulfilled, (state, action) => {
        if(action.meta.arg === 'contexts'){
        state.contexts.push(action.payload);
        state.error = null;
      }
      })
      .addCase(addModel.rejected, (state, action) => {
        if(action.meta.arg === 'contexts'){
        state.error = action.payload;
      }
      })
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.contexts,
        };
      })
  },
});

export default contextsSlice.reducer;
