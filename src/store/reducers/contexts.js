// src/store/reducers/contexts.js

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchModels, fetchModelData, addModel, fetchAssocData, fetchModelContext, fetchUniverseSubdivisions
} from '../actions/models';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  contexts: {universe: [], subdivisions: [], features: []},
  error: null,
};

const contextsSlice = createSlice({
  name: 'contexts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchModelContext.fulfilled, (state, action) => {
      if(action.meta.arg.modelName === 'games'){
        const universe = !state.contexts?.universe?.length ? [] : [ ...state.contexts.universe];
        //console.log('context reducer action.payload ' ,universe, action);
        const contexts = universe.length ? universe.map((ctx) => {
          if(ctx.id === action.payload.id){
            return action.payload;
          }
          return ctx;
        }) : [action.payload];
        const finalContexts = contexts.some((ctx) => ctx.id === action.payload.id) ? contexts : [...contexts, action.payload];
        state.contexts.universe = finalContexts;
        //console.log('context reducer state.contexts ' ,state.contexts);
        state.error = null;
      }
    })
    .addCase(addModel.fulfilled, (state, action) => {
      if(action.meta.arg.modelName === 'subdivision'){
        state.contexts.subdivisions = [...state.contexts.subdivisions, action.payload];
        const uniqueSubdivisions = state.contexts.subdivisions.filter((subdivision, index, self) =>
          index === self.findIndex((t) => (
            t.id === subdivision.id
          ))
        )
        state.contexts.subdivisions = uniqueSubdivisions;
        state.error = null;
      }
      if(action.meta.arg.modelName === 'feature'){
        state.contexts.features = [...state.contexts.features, action.payload];
        const uniqueFeatures = state.contexts.features.filter((feature, index, self) =>
          index === self.findIndex((t) => (
            t.id === feature.id
          ))
        )
        state.contexts.features = uniqueFeatures;
        state.error = null;
      }
    })
    .addCase(fetchUniverseSubdivisions.fulfilled, (state, action) => {
      console.log('fetchUniverseSubdivisions.fulfilled action', action);
      if(action.meta.arg.modelName === 'subdivision'){
        console.log('fetchUniverseSubdivisions.fulfilled state.contexts', JSON.parse(JSON.stringify(state.contexts)));
        
        state.contexts.subdivisions = [...action.payload, ...(state.contexts.subdivisions || [])];
        //filter so that only unique ids are in the array
        const uniqueSubdivisions = state.contexts.subdivisions.filter((subdivision, index, self) =>
          index === self.findIndex((t) => (
            t.id === subdivision.id
          ))
        )
        state.contexts.subdivisions = uniqueSubdivisions;

        state.error = null;
      }
      if(action.meta.arg.modelName === 'feature'){
        console.log('fetchUniverseFeatures.fulfilled state.contexts', JSON.parse(JSON.stringify(state.contexts)));
        
        state.contexts.features = [...action.payload, ...(state.contexts.features || [])];
        //filter so that only unique ids are in the array
        const uniqueFeatures = state.contexts.features.filter((feature, index, self) =>
          index === self.findIndex((t) => (
            t.id === feature.id
          ))
        )
        state.contexts.features = uniqueFeatures;

        state.error = null;
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

export default contextsSlice.reducer;
