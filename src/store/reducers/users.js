// src/store/reducers/users.js

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchModels, fetchModelData, fetchAssocData 
} from '../actions/models';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  users: [],
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAssocData.fulfilled, (state, action) => {
      if(action.meta.arg.modelName === 'games'){
        const { gm = {}, players = [] } = action.payload
        const users = state.users.length ? state.users.map((user) => {
          if(user.id === gm.id) return gm;
          if(players.some((player) => player.id === user.id)) return players.find((player) => player.id === user.id);
          return user;
        }) : [action.payload];
        state.users = users;
        state.error = null;
      }
    })
    .addCase(fetchModels.fulfilled, (state, action) => {
      if(action.meta.arg === 'users'){
        console.log('fetch users success', action, state);
        state.users = action.payload;
        state.error = null;
      }
    })
      .addCase(fetchModels.rejected, (state, action) => {
        if(action.meta.arg === 'users'){
        state.users = [];
        state.error = action.payload;
      }
      })
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.users,
        };
      });
  },
});

export default usersSlice.reducer;
