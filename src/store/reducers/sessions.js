// src/store/reducers/sessions.js

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchModels,
  fetchModelData,
  addModel,
  fetchAssocData,
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
    .addCase(fetchAssocData.fulfilled, (state, action) => {
      if(action.meta.arg.modelName === 'games'){
        const { sessions = [] } = action.payload
        
        //merge sessions and state.sessions into the state
        
        const newSessions = sessions.map((session) => {
          const existingSession = state.sessions.find((s) => s.id === session.id);
          if(existingSession){
            return existingSession;
          }
          return session;
        });
        //retain any sessions that are not in the new sessions
        const oldSessions = state.sessions.filter((session) => {
          const existingSession = newSessions.some((s) => s.id === session.id);
          if(existingSession){
            return false;
          }
          return true;
        });

        state.sessions = [...newSessions, ...oldSessions];
        
        state.error = null;
      }
    })
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
