// src/store/reducers/sessions.js

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchModels,
  fetchModelData,
  addModel
} from '../actions/models';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  sessions: [],
  error: null,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchModelData.fulfilled, (state, action) => {
      if(action.meta.arg === 'sessions'){
        console.log('fetch session success', action, state);
        state.sessions = action.payload;
        state.error = null;
      }
    })
      .addCase(fetchModelData.rejected, (state, action) => {
        if(action.meta.arg === 'sessions'){
        state.sessions = [];
        state.error = action.payload;
      }
      })
    .addCase(fetchModels.fulfilled, (state, action) => {
      if(action.meta.arg === 'sessions'){
        console.log('fetch sessions success', action, state);
        state.sessions = action.payload;
        state.error = null;
      }
    })
      .addCase(fetchModels.rejected, (state, action) => {
        if(action.meta.arg === 'sessions'){
        state.sessions = [];
        state.error = action.payload;
      }
      })
      .addCase(addModel.fulfilled, (state, action) => {
        if(action.meta.arg === 'sessions'){
        state.sessions.push(action.payload);
        state.error = null;
      }
      })
      .addCase(addModel.rejected, (state, action) => {
        if(action.meta.arg === 'sessions'){
        state.error = action.payload;
      }
      })
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.sessions,
        };
      })
  },
});

export default sessionsSlice.reducer;
