// src/store/reducers/gms.js

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchModels, fetchModelData, addModel, fetchAssocData 
} from '../actions/models';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  gms: [],
  error: null,
};

const gmsSlice = createSlice({
  name: 'gms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAssocData.fulfilled, (state, action) => {
      if(action.meta.arg.modelName === 'gms'){
        const gms = state.gms.length ? state.gms.map((game) => {
          if(game.id === action.payload.id){
            return action.payload;
          }
          return game;
        }) : [action.payload];
        state.gms = gms;
        state.error = null;
      }
      if(action.meta.arg.modelName === 'users'){
        const { gm = {} } = action.payload
        const gms = state.gms.length ? state.gms.map((user) => {
          if(user.id === gm.id) return gm;
          return user;
        }) : [gm];
        state.gms = gms;
        state.error = null;
      }
    })
      .addCase(fetchAssocData.rejected, (state, action) => {
        if(action.meta.arg.modelName === 'gms'){
        state.error = action.payload;
      }
      })
      .addCase(fetchModelData.fulfilled, (state, action) => {
        if(action.meta.arg === 'gms'){
          const gms = state.gms.gms.map((game) => {
            if(game.id === action.payload.id){
              return action.payload;
            }
            return game;
          });
          state.gms.gms = gms;
          state.error = null;
        }
      })
        .addCase(fetchModelData.rejected, (state, action) => {
          if(action.meta.arg === 'gms'){
          state.error = action.payload;
        }
        })
      .addCase(fetchModels.fulfilled, (state, action) => {
        if(action.meta.arg === 'gms'){
          state.gms = action.payload;
          state.error = null;
        }
      })
        .addCase(fetchModels.rejected, (state, action) => {
          if(action.meta.arg === 'gms'){
          state.gms = [];
          state.error = action.payload;
        }
        })
      .addCase(addModel.fulfilled, (state, action) => {
        if(action.meta.arg === 'gms'){
        state.gms.push(action.payload);
        state.error = null;
      }
      })
      .addCase(addModel.rejected, (state, action) => {
        if(action.meta.arg === 'gms'){
        state.error = action.payload;
      }
      })
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.gms,
        };
      })
  },
});

export default gmsSlice.reducer;
