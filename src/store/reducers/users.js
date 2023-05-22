// src/store/reducers/users.js

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchModels, fetchModelData, fetchAssocData 
} from '../actions/models';
import { updateSettings } from '../actions/settings';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  users: [],
  error: null,
};

function mergeUsers(users, incUsers) {
  // Create a map to store the merged objects
  const mergedMap = new Map();

  // Add objects from users array to the merged map
  for (const user of users) {
    mergedMap.set(user.id, user);
  }

  // Add objects from incUsers array to the merged map (overwriting existing objects)
  for (const incUser of incUsers) {
    mergedMap.set(incUser.id, incUser);
  }

  // Return the merged values from the map as an array
  return Array.from(mergedMap.values());
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAssocData.fulfilled, (state, action) => {
      if(action.meta.arg.modelName === 'games'){
        const { gm = {}, players = [] } = action.payload
        const incUsers = mergeUsers([gm], players)
        const users = mergeUsers(state.users, incUsers)
        state.users = users;
        state.error = null;
      }
      if(action.meta.arg.modelName === 'users'){
        const users = state.users.length ? state.users.map((user) => {
          if(user.id === action.payload.id){
            return action.payload;
          }
          return user;
        }) : [action.payload];
        state.users = users;
        state.error = null;
      }
    })
    .addCase(fetchModels.fulfilled, (state, action) => {
      if(action.meta.arg === 'users'){
        state.users = action.payload;
        state.error = null;
      }
    })
    .addCase(updateSettings.fulfilled, (state, action) => {
        const users = state.users.length ? state.users.map((user) => {
          if(user.id === action.payload.id){
            return action.payload;
          }
          return user;
        }) : [action.payload];
        state.users = users;
        state.error = null;
      
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
